# One-Page-Preferneces-in-SFCC

# Introduction
It is used to build a one page view of the site’s preferences within a SFCC instance. In this we show the custom preference with name, id, value, and its group id.
# Prerequisites
## 1.Set the cartridge path:
To use this cartridge upload it in your current code version and update the cartridge path in the business manager as follows.\
    Go to **Administration > Sites > Manage Sites > Business Manager – Settings** and enter the name of your cartridge. \
Now head over to the **Administration > Organization > Roles > Administrator - Business Manager Modules** section. \
Given that the cartridge was uploaded successfully to the active version, and you have done the above step then you will be able to see Custom preference storage inside this Search Custom preference by Id and Click on the update button at the bottom right to update the modules for the current site context.
Now if you refresh the business manager once you will be able to see the updated module in the Merchant Tool section. 
## 2.Setting up the services 
We need to configure the services for ocapi configuration. One is for getting an access token to access the resources. The second service will get all the preference group, and the third service is used to get all preference id with respect to group id and the last one for preference name.

### a)Setting service for an access token:- 
Go to **Administration > Operations > Services > Credentials**, and create a new credential set the Name field to Create_token set the URL field https://account.demandware.com/dw/oauth2/access_token?client_id=f6c42b70-d247-4ff8-a1ab-65c90c1379ac&client_secret=f6c42b70-d247-4ff8-a1ab-65c90c1379ac&grant_type=client_credentials
Go to **Administration > Operations > Services > Profiles** and create a new profile with Name Create_token set the Connection Timeout to 1000 ms.

Go to **Administration > Operations > Services** and create a service with Name Create_token, set Type to HTTP, set Enable, and set Service Mode to Live. In the Profile and Credentials section select the Profile and Credentials we have just created with the name Create_token. 

### b)	Setting service for preference group: - 
Go to **Administration > Operations > Services** and create a service with Name getPreferenceGruop, set Type to HTTP, set Enable, and set Service Mode to Live. 


### c)	Setting service for preference Id: - 
Go to **Administration > Operations > Services** and create a service with Name getPreferenceId, set Type to HTTP, set Enable, and set Service Mode to Live. 
### d)	Setting service for preference Name: - 
Go to **Administration > Operations > Services** and create a service with Name getPreferenceName, set Type to HTTP, set Enable, and set Service Mode to Live. 

## 3.OCAPI settings in BM:
•	Go to Administration > Site Development > Open Commerce API Settings \
•	Select Type: Data \
•	Select Context: Global \
•	Settings for default client id (Change the client id if required). 

```
{
    "_v":"21.3",
    "clients":[
        {
            "client_id":"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            "resources":[
            {
                "resource_id": "/system_object_definitions/*/attribute_groups",
                "methods": [
                    "get"
                ],
                "read_attributes": "(**)"
            },
            {
                "resource_id": "/site_preferences/preference_groups/*/*/preference_search",
                "methods": [
                    "post"
                ],
                "read_attributes": "(**)",
                 "write_attributes": "(**)"
            },
            {
                "resource_id": "/site_preferences/preference_groups/*/*/preferences/*",
                "methods": [
                    "get"
                ],
                "read_attributes": "(**)",
                 "write_attributes": "(**)"
            }
            ]
        }
    ]
}
```



