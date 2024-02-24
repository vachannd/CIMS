# CIMS
Car Inventory management System

This application helps manage Car Inventory for a dealer/manufacturer

The features include:

1. User types: Admin and normal users

2. Admin can:

    * Add a new car model

    * Add more cars to the inventory of an existing car model

    * See a list of all purchase orders of all users

    * See a list of all the cars available in the inventory

3. Users can:

    * See the inventory of cars

    * Purchase cars from the inventory

    * See their past purchase orders

NOTE: Please refresh the page after signing in.

_________________

<h3> Dev Setup </h3>

## Backend:

1. Create a virtual environment: `python3 -m venv venv`

2. Activate virtual environment: `source venv/bin/activate`

3. Install all dependencies: 
```
pip3 install django

pip3 install -r requirements.txt
```

4. Run the database migrations: 
```
cd backend

python3 manage.py makemigrations

python3 manage.py migrate
```
5. Create a new account for an admin using the following command. The command will prompt you to enter details about the admin, use the same email and password entered to login
```
python3 manage.py createsuperuser
```

6. Run the app: 
```
python3 manage.py runserver
```

7. Backend will run on `localhost:8000`


__________________
## Frontend:

1. Install packages: 

```
cd frontend

npm install
```

2. Run the frontend: `npm run dev`

3. Frontend will run on http://localhost:3000

References:
1. https://nextjs.org/learn/dashboard-app

2. https://nextjs.org/docs/app/building-your-application

3. https://stackoverflow.com/questions/34989915/write-only-read-only-fields-in-django-rest-framework 

4. https://stackoverflow.com/questions/5508888/matching-query-does-not-exist-error-in-django 

5. https://docs.djangoproject.com/en/5.0/topics/auth/default/#authenticating-users
