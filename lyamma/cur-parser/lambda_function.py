import json

def lambda_handler(event, context):
    s3_data = event['Records'][0]['s3']
    file_name = s3_data['object']['key']
    bucket_name = s3_data['bucket']['name']

    print(file_name)
    print(bucket_name)
    return {
        'statusCode': 200,
        'body': 'File received successfully'
    }
