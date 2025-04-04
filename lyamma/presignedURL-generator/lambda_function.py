import boto3
import json
import re

def get_account_id_from_arn(arn):
    match = re.search(r'arn:aws:iam::(\d+):', arn)
    return match.group(1) if match else None

def lambda_handler(event, context):
    # Check for GET method
    if event.get('requestContext', {}).get('http', {}).get('method') != 'GET':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Use GET method'})
        }

    # Extract roleARN from query parameters
    query_params = event.get('queryStringParameters', {})
    role_arn = query_params.get('roleARN')

    if not role_arn:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Missing roleARN parameter'})
        }

    # Validate and extract account ID from ARN
    account_id = get_account_id_from_arn(role_arn)
    if not account_id:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid ARN format'})
        }

    # Generate S3 key and bucket name
    key = f"{account_id}.parquet"
    bucket_name = "kalpa-cur-reports"

    # Generate presigned URL
    s3 = boto3.client('s3')
    try:
        signed_url = s3.generate_presigned_url(
            ClientMethod='put_object',
            HttpMethod='PUT',
            Params={
                'Bucket': bucket_name,
                'Key': key,
                'ContentType': 'application/vnd.apache.parquet'
            },
            ExpiresIn=300  # 5 minutes
        )
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,OPTIONS,POST/PUT',
            },
            'body': json.dumps({'error': str(e)})
        }

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'signedUrl': signed_url})
    }

