

### DynamoDB Table Structure (kalpa_customers)

customer_id (Partition Key)	customer_name
"DC1"	"DEMO_CUSTOMER1"
"DC2"	"DEMO_CUSTOMER2"


> customer_id → Acts as a primary key (must be unique).
> customer_name → Regular attribute, no indexing needed.


```py
import boto3

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb', region_name='us-west-2')  # Change as needed

# Create `kalpa_customers` table
response = dynamodb.create_table(
    TableName='kalpa_customers',
    KeySchema=[
        {'AttributeName': 'customer_id', 'KeyType': 'HASH'}  # Primary Key
    ],
    AttributeDefinitions=[
        {'AttributeName': 'customer_id', 'AttributeType': 'S'},  # S = String
        {'AttributeName': 'customer_name', 'AttributeType': 'S'}  # S = String
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,
        'WriteCapacityUnits': 5
    }
)

print("Table `kalpa_customers` creation in progress...")
```


### kalpa_customer_payer_account_ids

This table stores billing account IDs linked to customers.


> Partition Key (customer_id) → Groups records by customer. Primary Key:

> Sort Key (bill_payer_account_id) → Stores multiple payer accounts under one customer.


```py
# Create `kalpa_customer_payer_account_ids` table
response = dynamodb.create_table(
    TableName='kalpa_customer_payer_account_ids',
    KeySchema=[
        {'AttributeName': 'customer_id', 'KeyType': 'HASH'},  # Partition Key
        {'AttributeName': 'bill_payer_account_id', 'KeyType': 'RANGE'}  # Sort Key
    ],
    AttributeDefinitions=[
        {'AttributeName': 'customer_id', 'AttributeType': 'S'},  # S = String
        {'AttributeName': 'bill_payer_account_id', 'AttributeType': 'S'}  # S = String
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,
        'WriteCapacityUnits': 5
    }
)

print("Table `kalpa_customer_payer_account_ids` creation in progress...")
```



### cur_ondemand_usage

```
Column Name	Data Type (DynamoDB)
line_item_resource_id	String (Partition Key)
bill_payer_account_id	String (Sort Key)
product_product_name	String
line_item_product_code	String
product_region	String
line_item_usage_type	String
product_instance_type_family	String
product_instance_type	String
line_item_operation	String
line_item_line_item_type	String
line_item_normalization_factor	Number
line_item_usage_amount	Number
line_item_unblended_cost	Number
line_item_normalized_usage_amount	Number
```


```py
import boto3

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb', region_name='us-west-2')  # Change region if needed

# Create `cur_ondemand_usage` table with all 14 columns
response = dynamodb.create_table(
    TableName='cur_ondemand_usage',
    KeySchema=[
        {'AttributeName': 'line_item_resource_id', 'KeyType': 'HASH'},  # Partition Key
        {'AttributeName': 'bill_payer_account_id', 'KeyType': 'RANGE'}  # Sort Key
    ],
    AttributeDefinitions=[
        {'AttributeName': 'line_item_resource_id', 'AttributeType': 'S'},
        {'AttributeName': 'bill_payer_account_id', 'AttributeType': 'S'},
        {'AttributeName': 'product_product_name', 'AttributeType': 'S'},
        {'AttributeName': 'line_item_product_code', 'AttributeType': 'S'},
        {'AttributeName': 'product_region', 'AttributeType': 'S'},
        {'AttributeName': 'line_item_usage_type', 'AttributeType': 'S'},
        {'AttributeName': 'product_instance_type_family', 'AttributeType': 'S'},
        {'AttributeName': 'product_instance_type', 'AttributeType': 'S'},
        {'AttributeName': 'line_item_operation', 'AttributeType': 'S'},
        {'AttributeName': 'line_item_line_item_type', 'AttributeType': 'S'},
        {'AttributeName': 'line_item_normalization_factor', 'AttributeType': 'N'},
        {'AttributeName': 'line_item_usage_amount', 'AttributeType': 'N'},
        {'AttributeName': 'line_item_unblended_cost', 'AttributeType': 'N'},
        {'AttributeName': 'line_item_normalized_usage_amount', 'AttributeType': 'N'}
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,
        'WriteCapacityUnits': 5
    }
)

print("Table `cur_ondemand_usage` creation in progress...")

```

### cur_reservation_utilization_wastage

```py
import boto3

# Initialize DynamoDB client
dynamodb = boto3.client('dynamodb', region_name='us-west-2')  # Change region if needed

# Create `reservation_utilization_wastage` table
response = dynamodb.create_table(
    TableName='reservation_utilization_wastage',
    KeySchema=[
        {'AttributeName': 'bill_payer_account_id', 'KeyType': 'HASH'},  # Partition Key
        {'AttributeName': 'reservation_reservation_a_r_n', 'KeyType': 'RANGE'}  # Sort Key
    ],
    AttributeDefinitions=[
        {'AttributeName': 'bill_payer_account_id', 'AttributeType': 'S'},
        {'AttributeName': 'reservation_reservation_a_r_n', 'AttributeType': 'S'},
        {'AttributeName': 'product_product_name', 'AttributeType': 'S'},
        {'AttributeName': 'line_item_product_code', 'AttributeType': 'S'},
        {'AttributeName': 'line_item_usage_type', 'AttributeType': 'S'},
        {'AttributeName': 'product_region', 'AttributeType': 'S'},
        {'AttributeName': 'product_instance_type_family', 'AttributeType': 'S'},
        {'AttributeName': 'product_instance_type', 'AttributeType': 'S'},
        {'AttributeName': 'pricing_offering_class', 'AttributeType': 'S'},
        {'AttributeName': 'pricing_purchase_option', 'AttributeType': 'S'},
        {'AttributeName': 'line_item_operation', 'AttributeType': 'S'},
        {'AttributeName': 'line_item_line_item_type', 'AttributeType': 'S'},
        {'AttributeName': 'reservation_purchase_term', 'AttributeType': 'S'},
        {'AttributeName': 'manual_recommendation', 'AttributeType': 'S'},
        {'AttributeName': 'line_item_unblended_rate', 'AttributeType': 'N'},
        {'AttributeName': 'reservation_normalization_factor', 'AttributeType': 'N'},
        {'AttributeName': 'reservation_total_reserved_normalized_units', 'AttributeType': 'N'},
        {'AttributeName': 'reservation_unused_normalized_unit_quantity', 'AttributeType': 'N'},
        {'AttributeName': 'number_of_months', 'AttributeType': 'N'},
        {'AttributeName': 'reservation_used_normalized_unit_quantity', 'AttributeType': 'N'},
        {'AttributeName': 'reservation_wastage_cost', 'AttributeType': 'N'},
        {'AttributeName': 'reservation_utilization_cost', 'AttributeType': 'N'},
        {'AttributeName': 'reservation_utilization_percent', 'AttributeType': 'N'},
        {'AttributeName': 'reservation_wastage_percent', 'AttributeType': 'N'},
        {'AttributeName': 'usage_normalization_factor', 'AttributeType': 'N'},
        {'AttributeName': 'not_utilize_usage_instance_count', 'AttributeType': 'N'}
    ],
    ProvisionedThroughput={
        'ReadCapacityUnits': 5,
        'WriteCapacityUnits': 5
    }
)

print("Table `reservation_utilization_wastage` creation in progress...")

```