import pandas as pd

# Load the CSV file
df = pd.read_csv("data.csv")

# Function to convert HH:MM:SS to seconds
def time_to_seconds(time_str):
    h, m, s = map(int, time_str.split(":"))
    return h * 3600 + m * 60 + s

# Apply transformation
df["result"] = df["result"].apply(time_to_seconds)

# Save the modified CSV
df.to_csv("new_data.csv", index=False)

print(df)

