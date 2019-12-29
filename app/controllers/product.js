// import * as msRest from "@azure/ms-rest-js";
// import * as msRestAzure from "@azure/ms-rest-azure-js";
const msRestNodeAuth = require("@azure/ms-rest-nodeauth");
const armContainerInstance = require("@azure/arm-containerinstance");

const subscriptionId = "8769913d-a5f6-415f-9f36-e043f9ea7a50";

const clientId = "563788a9-ff72-4ca8-939d-a2fafaa5ef98";
const secret = "6AKUuEPJ4.e8DdsF:0QE@H[oS_-7flbO";
const tenantId = "778bb00b-0a14-408d-afca-c240f208556d";

function randomString(length) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}
 
exports.index = function (req, res) {
    res.render('pages/products/detail', { 'layout': 'layouts/default' })    
}

exports.deploy = function (req, res) {
    const image_type = req.body.type;
    
    msRestNodeAuth.loginWithUsernamePassword("ernesto@learningvoyage.onmicrosoft.com", "Descartes21")
    .then((creds) => {
        const client = new armContainerInstance.ContainerInstanceManagementClient(creds, subscriptionId);
        // client.containerGroups.list().then((result) => {
        //     console.log("The result is:");
        //     console.log(result);
        // });

        let image = ''
        let containerGroupName = ''
        let dnsNameLabel = ''
        let randomStr = randomString(5);
        
        if (image_type == 'helloworld') {
            image = 'microsoft/aci-helloworld'
            containerGroupName = 'helloworld' + randomStr
            dnsNameLabel = 'helloworld' + randomStr
        }
        else {
            image = 'dorowu/ubuntu-desktop-lxde-vnc'
            containerGroupName = 'ubuntu' + randomStr
            dnsNameLabel = 'ubuntu' + randomStr
        }

        console.log('dnsNameLabel', dnsNameLabel);

        client.containerGroups.createOrUpdate('group1', containerGroupName, {
            "location": "westus", 
            "tags": {}, 
            "containers": [
                {
                    "name": containerGroupName, 
                    "image": image, 
                    "ports": [
                        {
                            "protocol": "TCP", 
                            "port": 80
                        }
                    ], 
                    "resources": {
                        "requests": {
                            "memoryInGB": 1.0, 
                            "cpu": 1.0
                        }
                    }
                }
            ], 
            "restartPolicy": "Always", 
            "ipAddress": {
                "ports": [
                    {
                        "protocol": "TCP", 
                        "port": 80
                    }
                ], 
                "type": "Public", 
                "dnsNameLabel": dnsNameLabel
            }, 
            "osType": "Linux"
        }).then((result) => {
            console.log('result is');
            console.log(result);

            if (result.provisioningState == "Succeeded") {
                res.status(200).json({'result': 'success', 'address': result.ipAddress})
            }
            else {
                res.status(400).json({'result': 'fail', 'error': 'error'})
            }            
        }).catch((error) => {
            console.log(error);
            res.status(400).json({'result': 'success', 'error': error})    
        })
    })
    .catch((err) => {
        console.error(err);
    });
}

exports.detail = function (req, res) {
    res.render('pages/products/detail', { 'layout': 'layouts/default' })
}