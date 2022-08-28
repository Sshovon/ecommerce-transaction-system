gnome-terminal --tab
cd  ecom-api


if [ -f .env ]; then
echo "old .env found"
rm -rf .env
echo "old .env removed"
fi
echo "creating new .env"
touch .env
echo "PORT = 6006" >> .env
echo "DB_URL = mongodb+srv://admin:7CmtlFXvGttRRmSz@cluster0.tslur.mongodb.net/?retryWrites=true&w=majority" >> .env
echo "JWT=nahdi" >> .env
echo "env created successfully"

yarn  install && yarn start
