FROM python:3.11.4-alpine

COPY ./requirements.txt requirements.txt
RUN apk update && apk add mysql-client
RUN pip install --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

COPY . /code
WORKDIR /code

EXPOSE 8000

COPY entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

ENTRYPOINT ["entrypoint.sh"]
