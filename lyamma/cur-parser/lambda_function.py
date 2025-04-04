import json
import pandas as pd
import numpy as np
import boto3
from fastparquet import ParquetFile

s3 = boto3.client('s3')
session = boto3.Session()

dynamodb = session.resource('dynamodb')

# Reference to the DynamoDB tables
ondemand_table = dynamodb.Table('cur-extracted-ondemand')
discounted_table = dynamodb.Table('cur-extracted-discounted')
ri_table = dynamodb.Table('cur-extracted-ri')

def convert_to_string(item):
    return {k: str(v) for k, v in item.items()}


def save_to_dynamodb(df: pd.DataFrame, table):
    for index, row in df.iterrows():
        item = {
            'line_item_resource_id': row['line_item_resource_id'],
            'bill_payer_account_id': row['bill_payer_account_id'],
            'product_product_name': row['product_product_name'],
            'product_region': row['product_region'],
            'line_item_usage_type': row['line_item_usage_type'],
            'product_instance_type_family': row['product_instance_type_family'],
            'product_instance_type': row['product_instance_type'],
            'line_item_operation': row['line_item_operation'],
            'line_item_line_item_type': row['line_item_line_item_type'],
            'line_item_normalization_factor': row['line_item_normalization_factor'],
            'line_item_usage_amount': row['line_item_usage_amount'],
            'line_item_unblended_cost': row['line_item_unblended_cost'],
            'line_item_normalized_usage_amount': row['line_item_normalized_usage_amount'],
            'line_item_product_code': row['line_item_product_code']
        }
        item = convert_to_string(item)
        table.put_item(Item=item)


def save_ri_to_dynamodb(df: pd.DataFrame, table):
    for index, row in df.iterrows():
        item = {
            'bill_payer_account_id': row['bill_payer_account_id'],
            'reservation_reservation_a_r_n': row['reservation_reservation_a_r_n'],
            'product_product_name': row['product_product_name'],
            'line_item_usage_type': row['line_item_usage_type'],
            'line_item_product_code': row['line_item_product_code'],
            'product_region': row['product_region'],
            'product_instance_type_family': row['product_instance_type_family'],
            'product_instance_type': row['product_instance_type'],
            'pricing_offering_class': row['pricing_offering_class'],
            'pricing_purchase_option': row['pricing_purchase_option'],
            'line_item_operation': row['line_item_operation'],
            'line_item_line_item_type': row['line_item_line_item_type'],
            'reservation_purchase_term': row['reservation_purchase_term'],
            'line_item_unblended_rate': row['line_item_unblended_rate'],
            'reservation_normalization_factor': row['reservation_normalization_factor'],
            'reservation_total_reserved_normalized_units': row['reservation_total_reserved_normalized_units'],
            'reservation_unused_normalized_unit_quantity': row['reservation_unused_normalized_unit_quantity'],
            'number_of_months': row['number_of_months'],
            'reservation_used_normalized_unit_quantity': row['reservation_used_normalized_unit_quantity'],
            'reservation_wastage_cost': row['reservation_wastage_cost'],
            'reservation_utilization_cost': row['reservation_utilization_cost'],
            'reservation_utilization_percent': row['reservation_utilization_percent'],
            'reservation_wastage_percent': row['reservation_wastage_percent'],
            'manual_recommendation': row['manual_recommendation']
        }
        item = convert_to_string(item)
        table.put_item(Item=item)


def get_data_from_s3(bucket_name, obj_key, download_path):
    s3.download_file(bucket_name, obj_key, download_path)


def lambda_handler(event, context):
    s3_data = event['Records'][0]['s3']
    file_name = s3_data['object']['key']
    bucket_name = s3_data['bucket']['name']
    download_path = '/tmp/' + file_name
    get_data_from_s3(bucket_name, file_name, download_path)

    pf = ParquetFile(download_path)
    df = pf.to_pandas()

    effective_cur_columns = ['line_item_resource_id', 'bill_payer_account_id', 'bill_billing_period_start_date',
                             'bill_billing_period_end_date', 'line_item_usage_account_id', 'line_item_line_item_type',
                             'line_item_usage_start_date', 'line_item_usage_end_date',
                             'line_item_product_code', 'product_product_name', 'product_instance_family',
                             'product_instance_type', 'product_instance_type_family', 'line_item_usage_type',
                             'line_item_operation', 'line_item_availability_zone',
                             'line_item_usage_amount', 'line_item_normalization_factor',
                             'line_item_normalized_usage_amount', 'line_item_unblended_rate',
                             'line_item_unblended_cost', 'pricing_term', 'pricing_unit', 'pricing_offering_class',
                             'pricing_purchase_option',
                             'reservation_amortized_upfront_cost_for_usage',
                             'reservation_amortized_upfront_fee_for_billing_period', 'reservation_effective_cost',
                             'reservation_end_time', 'reservation_normalized_units_per_reservation',
                             'reservation_number_of_reservations', 'reservation_recurring_fee_for_usage',
                             'reservation_reservation_a_r_n', 'reservation_start_time', 'reservation_subscription_id',
                             'reservation_total_reserved_normalized_units',
                             'reservation_total_reserved_units', 'reservation_units_per_reservation',
                             'reservation_unused_amortized_upfront_fee_for_billing_period',
                             'reservation_unused_normalized_unit_quantity', 'reservation_unused_quantity',
                             'reservation_unused_recurring_fee', 'reservation_upfront_value',
                             'product_operating_system', 'product_region']
    # projection on the df to get data of only selected colmns
    df = df.loc[:, effective_cur_columns]

    product_names = [
        'Amazon Elastic Compute Cloud',
        'Amazon Relational Database Service',
        'Amazon ElastiCache',
        'Amazon OpenSearch Service',
        'Amazon Elasticsearch Service',
        'Amazon Redshift',
        'Amazon DynamoDB'
    ]

    df = df[df['product_product_name'].isin(product_names)]

    discounted_usage_pricing_column_df = df[df['line_item_line_item_type'] == 'DiscountedUsage']

    # Group by the required columns and get the unique combinations
    discounted_usage_pricing_column_df = discounted_usage_pricing_column_df[
        ['pricing_offering_class', 'pricing_purchase_option', 'reservation_reservation_a_r_n']].drop_duplicates()

    # Filter the DataFrame where 'line_item_line_item_type' is 'DiscountedUsage'

    on_demand_that_can_be_reserved = 'NodeUsage|ReadRequestUnits|WriteRequestUnits|InstanceUsage|BoxUsage'

    usage_df = df[df['line_item_line_item_type'] == 'Usage']

    # Filter the DataFrame
    usage_df = usage_df[usage_df['line_item_usage_type'].str.contains(on_demand_that_can_be_reserved, na=False)]

    usage_df['line_item_usage_amount'] = usage_df['line_item_usage_amount'].astype(float)
    usage_df['line_item_normalized_usage_amount'] = usage_df['line_item_normalized_usage_amount'].astype(float)
    usage_df['line_item_normalization_factor'] = usage_df['line_item_normalization_factor'].astype(float)
    usage_df.loc[usage_df['line_item_normalization_factor'] == 0, 'line_item_normalization_factor'] = 1
    usage_df['line_item_normalization_factor'].fillna(1).astype(int)
    usage_df.loc[usage_df['line_item_normalization_factor'] == '', 'line_item_normalization_factor'] = 1
    usage_df['line_item_unblended_cost'] = usage_df['line_item_unblended_cost'].astype(float)

    usage_df = usage_df.groupby(
        ['line_item_resource_id',
         'line_item_product_code',
         'bill_payer_account_id',
         'product_product_name',
         'product_region',
         'line_item_usage_type',
         'product_instance_type_family',
         'product_instance_type',
         'line_item_operation',
         'line_item_line_item_type',
         'line_item_normalization_factor'
         ]
    ).agg(
        line_item_usage_amount=('line_item_usage_amount', 'sum'),
        line_item_unblended_cost=('line_item_unblended_cost', 'count')
    ).reset_index()
    usage_df['line_item_normalized_usage_amount'] = usage_df['line_item_usage_amount'].astype(float) * usage_df[
        'line_item_normalization_factor'].astype(float)

    save_to_dynamodb(usage_df, ondemand_table)

    discounted_usage_df = df[df['line_item_line_item_type'] == 'DiscountedUsage']
    discounted_usage_df['line_item_usage_amount'] = discounted_usage_df['line_item_usage_amount'].astype(float)
    discounted_usage_df['line_item_normalized_usage_amount'] = discounted_usage_df[
        'line_item_normalized_usage_amount'].astype(float)
    discounted_usage_df['line_item_normalization_factor'] = discounted_usage_df[
        'line_item_normalization_factor'].astype(float)
    discounted_usage_df.loc[
        discounted_usage_df['line_item_normalization_factor'] == 0, 'line_item_normalization_factor'] = 1
    discounted_usage_df['line_item_normalization_factor'].fillna(1).astype(int)
    discounted_usage_df.loc[
        discounted_usage_df['line_item_normalization_factor'] == '', 'line_item_normalization_factor'] = 1
    discounted_usage_df['line_item_unblended_cost'] = discounted_usage_df['line_item_unblended_cost'].astype(float)

    discounted_usage_df = discounted_usage_df.groupby(
        ['line_item_resource_id',
         'bill_payer_account_id',
         'product_product_name',
         'line_item_product_code',
         'product_region',
         'line_item_usage_type',
         'product_instance_type_family',
         'product_instance_type',
         'line_item_operation',
         'line_item_line_item_type',
         'line_item_normalization_factor'
         ]
    ).agg(
        line_item_usage_amount=('line_item_usage_amount', 'sum'),
        line_item_unblended_cost=('line_item_unblended_cost', 'count')
    ).reset_index()
    discounted_usage_df['line_item_normalized_usage_amount'] = usage_df['line_item_usage_amount'].astype(float) * \
                                                               usage_df['line_item_normalization_factor'].astype(float)
    save_to_dynamodb(discounted_usage_df, discounted_table)

    #  reservation DF

    ri_fee = 'RIFee'

    line_item_line_item_type = 'line_item_line_item_type'
    reservation_reservation_a_r_n = 'reservation_reservation_a_r_n'
    bill_billing_period_month = 'bill_billing_period_month'

    effective_reservation_columns = ['bill_payer_account_id', 'line_item_usage_account_id', 'product_product_name',
                                     'line_item_product_code',
                                     'line_item_usage_type', 'line_item_line_item_type',
                                     'reservation_reservation_a_r_n', 'line_item_unblended_rate',
                                     'product_instance_type_family', 'product_operating_system', 'line_item_operation',
                                     'reservation_start_time', 'reservation_end_time', 'bill_billing_period_start_date',
                                     'bill_billing_period_end_date',
                                     'reservation_total_reserved_normalized_units',
                                     'reservation_unused_normalized_unit_quantity', 'line_item_normalization_factor',
                                     'product_region']

    reservation_df = df.loc[:, effective_reservation_columns]

    # getting reservation purchased
    reservation_df = reservation_df[reservation_df[line_item_line_item_type] == ri_fee]

    reservation_df['reservation_total_reserved_normalized_units'] = reservation_df[
        'reservation_total_reserved_normalized_units'].astype(float)

    reservation_df['reservation_unused_normalized_unit_quantity'] = reservation_df[
        'reservation_unused_normalized_unit_quantity'].astype(float)

    reservation_df['reservation_start_time'] = pd.to_datetime(reservation_df['reservation_start_time'])
    reservation_df['reservation_end_time'] = pd.to_datetime(reservation_df['reservation_end_time'])

    reservation_df['bill_billing_period_start_date'] = pd.to_datetime(reservation_df['bill_billing_period_start_date'])
    reservation_df['bill_billing_period_end_date'] = pd.to_datetime(reservation_df['bill_billing_period_end_date'])

    # Calculate the total hours between the start and end date
    reservation_df['bill_billing_period_total_hours'] = (reservation_df['bill_billing_period_end_date'] -
                                                         reservation_df[
                                                             'bill_billing_period_start_date']).dt.total_seconds() / 3600

    # Calculate the total YEAR between the start and end date
    reservation_df['reservation_purchase_term'] = ((reservation_df['reservation_end_time'] - reservation_df[
        'reservation_start_time']).dt.days / 365).round()

    # Calculate billing period month
    reservation_df['bill_billing_period_month'] = (reservation_df['bill_billing_period_start_date'].dt.month)

    reservation_df['product_instance_type_family'] = \
    reservation_df['line_item_usage_type'].str.split(':').str[-1].str.split('.').str[0]
    reservation_df['product_instance_type'] = reservation_df['line_item_usage_type'].str.split(':').str[-1]

    reservation_df['line_item_normalization_factor'] = reservation_df['line_item_normalization_factor'].astype(float)
    reservation_df.loc[reservation_df['line_item_normalization_factor'] == 0, 'line_item_normalization_factor'] = 1

    # get columns 'pricing_offering_class', 'pricing_purchase_option' from discounted_usage_pricing_column_df
    reservation_df = reservation_df.merge(discounted_usage_pricing_column_df, on='reservation_reservation_a_r_n',
                                          how='left')

    reservation_df['pricing_offering_class'] = reservation_df['pricing_offering_class'].fillna('Unknown')

    reservation_df['pricing_purchase_option'] = reservation_df['pricing_purchase_option'].fillna('Unknown')

    reservation_df = reservation_df.groupby(
        [
            'bill_payer_account_id',
            'reservation_reservation_a_r_n',
            'product_product_name',
            'line_item_product_code',
            'line_item_usage_type',
            'product_region',
            'product_instance_type_family',
            'product_instance_type',
            'pricing_offering_class',
            'pricing_purchase_option',
            'line_item_operation',
            'line_item_line_item_type',
            'reservation_purchase_term',
            'line_item_unblended_rate',
            'line_item_normalization_factor'
        ]
    ).agg(
        reservation_total_reserved_normalized_units=('reservation_total_reserved_normalized_units', 'sum'),
        reservation_unused_normalized_unit_quantity=('reservation_unused_normalized_unit_quantity', 'sum'),
        number_of_months=('bill_billing_period_month', 'count')
    ).reset_index()

    # calculate reservation_utilization_cost,reservation_wastage_cost
    reservation_df['reservation_used_normalized_unit_quantity'] = reservation_df[
                                                                      'reservation_total_reserved_normalized_units'].astype(
        float) - reservation_df['reservation_unused_normalized_unit_quantity'].astype(float)
    reservation_df['reservation_wastage_cost'] = (reservation_df['reservation_unused_normalized_unit_quantity']).astype(
        float) * (reservation_df['line_item_unblended_rate']).astype(float)
    reservation_df['reservation_utilization_cost'] = (reservation_df[
        'reservation_total_reserved_normalized_units']).astype(float) * (
                                                     reservation_df['line_item_unblended_rate']).astype(float)
    reservation_df['reservation_wastage_cost'] = (reservation_df['reservation_unused_normalized_unit_quantity']).astype(
        float) * (reservation_df['line_item_unblended_rate']).astype(float)
    reservation_df['reservation_utilization_percent'] = (reservation_df[
        'reservation_used_normalized_unit_quantity']).astype(float) / (reservation_df[
        'reservation_total_reserved_normalized_units']).astype(float) * 100
    reservation_df['reservation_wastage_percent'] = (reservation_df[
        'reservation_unused_normalized_unit_quantity']).astype(float) / (reservation_df[
        'reservation_total_reserved_normalized_units']).astype(float) * 100

    reservation_df.rename(columns={'line_item_normalization_factor': 'reservation_normalization_factor'}, inplace=True)

    # dorting data based on ['reservation_reservation_a_r_n','bill_billing_period_month']
    reservation_df = reservation_df.sort_values(by=[reservation_reservation_a_r_n])

    # Rename the column in-place

    # group usage_df by those columns and count occurrences
    usage_df_instance_count = usage_df.groupby([
        'product_product_name',
        'line_item_product_code',
        'product_region',
        'product_instance_type',
        'line_item_normalization_factor'
    ]).size().reset_index(name='not_utilize_usage_instance_count')

    usage_df_instance_count.rename(columns={'line_item_normalization_factor': 'usage_normalization_factor'},
                                   inplace=True)

    # Merge reservation_df with the usage_df_instance_count
    reservation_df = reservation_df.merge(usage_df_instance_count, on=[
        'product_product_name',
        'line_item_product_code',
        'product_region',
        'product_instance_type'
    ], how='left')

    # Step 4: Fill NaNs with 0 (if there was no match in df2)
    reservation_df['not_utilize_usage_instance_count'] = reservation_df['not_utilize_usage_instance_count'].fillna(
        0).astype(int)
    reservation_df['usage_normalization_factor'] = reservation_df['usage_normalization_factor'].fillna(1).astype(int)

    # Define conditions

    cond1 = (
            (reservation_df['reservation_unused_normalized_unit_quantity'] > 0) &
            (reservation_df['not_utilize_usage_instance_count'] > 0) &
            (reservation_df['usage_normalization_factor'] < reservation_df['reservation_normalization_factor'])
    )

    cond2 = (
            (reservation_df['not_utilize_usage_instance_count'] > 0) &
            (reservation_df['usage_normalization_factor'] < reservation_df['reservation_normalization_factor'])
    )

    cond3 = reservation_df['reservation_unused_normalized_unit_quantity'] > 0

    # Define corresponding values
    choices = [
        "ri_inefficient",  # this should be first, as it's a more specific case
        "ri_underutilized",
        "ri_wastage"
    ]

    # Order of conditions matters — most specific to most general
    conditions = [cond1, cond2, cond3]

    # Create the column
    reservation_df['manual_recommendation'] = np.select(conditions, choices, default="ri_optimized")

    save_ri_to_dynamodb(reservation_df, ri_table)

    return {
        'statusCode': 200,
        'body': 'File read successfully'
    }

