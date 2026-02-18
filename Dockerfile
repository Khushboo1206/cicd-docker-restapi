# FROM python:3.10

# WORKDIR /app

# COPY . .

# RUN pip install -r requirements.txt

# CMD ["python", "app.py"]
# use python image
FROM python:3.11

# set working directory
WORKDIR /app

# copy files
COPY . .

# install dependencies
RUN pip install -r requirements.txt

# expose port
EXPOSE 5000

# run backend
CMD ["python", "app.py"]

