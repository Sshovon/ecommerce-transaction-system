# Ecommerce-transaction-system

We have 3 APIs which will be working on 3 different ports and One Client. So we will need total 4 servers running at once. 

If you are an Linux user then you just have to run following scripts to start the server.

## Clone this repository.

```
git clone https://github.com/Sshovon/ecommerce-transaction-system.git
```
## Go into the respository folder 

## Execute Following Scripts 
Execute the scripts from the parent directory.
```
sh startBank.sh
```
Each script will open a new terminal tab and start the server in the previous terminal tab, where the script was executed.

```
sh startEcom.sh
```

```
sh startSupplier.sh
```
If you successfully executed all mentioned scripts, then our backend server is functional.

Now it's time for start the frontend server.
```
sh startFrontend.sh
```
