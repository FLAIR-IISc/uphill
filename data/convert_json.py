import pandas as pd 
import json 

structured_field_data = [
    {"name": "claim_veracity", "category": "Filter"},
    {"name": "presupposition_level", "category": "Filter"},
    {"name": "entailment_prediction", "category": "Filter"},
    {"name": "conversational_model", "category": "Filter"}
]

df = pd.read_csv("/home/navreet/uphill-rebuttal-experiments/data/uphill_0.csv")

necessary_fields = ['query_with_presupposition', 'conversational_model', 'claim_veracity', 'entailment_prediction']
other_fields = [ele for ele in df.columns if ele not in necessary_fields]

for field in structured_field_data:
    print(field['name'])
    all_values = list(set(df[field['name']].dropna().tolist()))
    field['values'] = [{"value": ele, "label": ele} for ele in all_values]

df['ID'] = [f"{i}" for i in range(len(df))]
df.to_json("../src/app/papers/uphill_small.json", orient="records", indent=4)

with open("../src/app/papers/structured_fields_uphill_small.json", "w") as f:
    json.dump(structured_field_data, f, indent=4)