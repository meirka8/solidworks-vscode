import pint


def ensure_serializable(data):
    if isinstance(data, dict):
        for key, value in data.items():
            data[key] = ensure_serializable(value)
    elif isinstance(data, list):
        for i in range(len(data)):
            data[i] = ensure_serializable(data[i])
    elif isinstance(data, pint.Quantity):
        data = str(data)
    return data
