# quick script to convert csv to static readable json
import pandas as pd

df = pd.read_csv("data.csv")
df = df.set_index("id")
df = df.transpose()
print(df.head())
df.to_json("json_data.json")
