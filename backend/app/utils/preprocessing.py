import re

def clean_text(text: str) -> str:
    """
    Cleans raw news headline or article text exactly matching the
    preprocessing pipeline established in the original project:
    1. Check if text is string, else return empty string.
    2. Convert to lowercase.
    3. Remove URLs matching http\\S+|www\\S+.
    4. Remove HTML tags matching <.*?>.
    5. Strip non-alphanumeric characters except whitespace [^a-zA-Z0-9\\s].
    6. Collapse consecutive whitespace characters into a single space.
    7. Strip leading and trailing whitespace.
    """
    if not isinstance(text, str):
        return ""
    
    text = text.lower()
    text = re.sub(r'http\S+|www\S+', '', text)
    text = re.sub(r'<.*?>', '', text)
    text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()
