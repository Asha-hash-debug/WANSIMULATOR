# using flask_restful
from flask import Flask, jsonify, request, render_template
from flask_restful import Resource, Api
from flask_cors import CORS,cross_origin
import requests
import json
from requests.packages.urllib3.exceptions import InsecureRequestWarning

requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
# creating the flask app
app = Flask(__name__)
CORS(app)
# creating an API object
api = Api(app)

# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.

@app.route('/')
def hello_world():
    return render_template("index.html")

class InterfaceStatus(Resource):
    def get(self,interfacename):

        if "ISP1" in interfacename:
            url = "https://192.168.0.200/show"
            print(url)
            if "BR1" in interfacename:
                interface = "eth1"
            elif "BR2" in interfacename:
                interface = "eth2"
            elif "DC1" in interfacename:
                interface = "eth3"
            else:
                interface = "eth4"
        elif "ISP2" in interfacename:
            url = "https://192.168.0.201/show"
            print(url)
            if "BR1" in interfacename:
                interface="eth1"
            elif "BR2" in interfacename:
                interface = "eth2"
            elif "DC1" in interfacename:
                interface = "eth3"
            else:
                interface = "eth4"
        else:
            url = "https://192.168.0.202/show"
            if "BR1" in interfacename:
                interface = "eth1"
            elif "BR2" in interfacename:
                interface = "eth2"
            elif "DC1" in interfacename:
                interface="eth3"
            else:
                interface="eth4"

        print(f"{url} with {interface}")
        payload = {'data': '{"op": "show", "path": ["interfaces","ethernet","' + interface + '"]}',
                   'key': 'vyosapikey'
                   }
        headers = {}
        response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        print(f'{response.status_code} -- Fetched Ethernet Interface Status')
        gets = response.json()
        finds = gets["data"]
        print(interface)

        if finds.find(",UP") == -1:
            print("DOWN")
            return "DOWN"
        else:
            print("UP")
            return "UP"

class Parameters(Resource):
    def get(self,interfacename):

        if "ISP1" in interfacename:
            url = "https://192.168.0.200/retrieve"
            print(url)
            if "BR1" in interfacename:
                policyname = "Policy1"
            elif "BR2" in interfacename:
                policyname = "Policy2"
            elif "DC1" in interfacename:
                policyname = "Policy3"
            else:
                policyname = "Policy4"
        elif "ISP2" in interfacename:
            url = "https://192.168.0.201/retrieve"
            print(url)
            if "BR1" in interfacename:
                policyname = "Policy1"
            elif "BR2" in interfacename:
                policyname = "Policy2"
            elif "DC1" in interfacename:
                policyname = "Policy3"
            else:
                policyname = "Policy4"
        else:
            url = "https://192.168.0.202/retrieve"
            if "BR1" in interfacename:
                policyname = "Policy1"
            elif "BR2" in interfacename:
                policyname = "Policy2"
            elif "DC1" in interfacename:
                policyname = "Policy3"
            else:
                policyname = "Policy4"

        payload = {'data': '{"op": "showConfig", "path": ["traffic-policy","network-emulator","' + policyname + '"]}',
                   'key': 'vyosapikey'
                   }
        headers = {}
        dict = {}
        response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        response1 = response.text
        response2 = json.loads(response1)
        dict["network-delay"] = response2["data"]["network-delay"].strip("ms")
        dict["packet-loss"] = response2["data"]["packet-loss"].strip("%")
        print(f"{dict} exist in {policyname}")
        return (dict)

class NetworkPolicy(Resource):

    def post(self):
        data = (request.json)
        print(type(data))
        print(type(data["delay"]))
        print(data)
        print(data["interface"])
        print(data["interface_status"])
        print(type(data["interface_status"]))

        if ("ISP1" in data["interface"]):
            url = "https://192.168.0.200/configure"
            print(url)
        elif ("ISP2" in data["interface"]):
            url = "https://192.168.0.201/configure"
            print(url)
        else:
            url = "https://192.168.0.202/configure"
            print(url)
        if ("eth1" in data["interface"]):
            policyname="Policy1"
            interfacename="eth1"
            print(policyname)
            print(type(policyname))
            print(interfacename)
        elif ("eth2" in data["interface"]):
            policyname="Policy2"
            interfacename = "eth2"
        elif ("eth3" in data["interface"]):
            policyname="Policy3"
            interfacename = "eth3"
        else:
            policyname="Policy4"
            interfacename = "eth4"

        payload = {
            'data': '{"op": "set", "path": ["traffic-policy","network-emulator","' + policyname + '","network-delay","' + str(data["delay"]) + 'ms"]}',
            'key': 'vyosapikey'
            }
        headers = {}
        response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        delayresponse = response.status_code
        print(f"{delayresponse} -- Network-Delay value Configured")

        payload = {
            'data': '{"op": "set", "path": ["traffic-policy","network-emulator","' + policyname + '","packet-loss","' + str(data["loss"]) + '%"]}',
            'key': 'vyosapikey'
        }
        headers = {}
        response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        lossresponse = response.status_code
        print(f"{lossresponse} -- Packet-Loss value Configured")

        # payload = {
        #     'data': '{"op": "set", "path": ["traffic-policy","network-emulator","' + policyname + '","packet-reordering","' + str(data["OOO"]) + '%"]}',
        #     'key': 'vyosapikey'
        # }
        # headers = {}
        # response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        # oooresponse = response.status_code
        # print(f"{oooresponse} -- OOO value Configured")
        #
        # payload = {
        #     'data': '{"op": "set", "path": ["traffic-policy","network-emulator","' + policyname + '","packet-corruption","' + str(data["corrupt"]) + '%"]}',
        #     'key': 'vyosapikey'
        # }
        # headers = {}
        # response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        # corruptresponse = response.status_code
        # print(f"{corruptresponse} -- Corrupt value Configured")

        payload = {
            'data': '{"op": "set", "path": ["interfaces","ethernet","' + interfacename + '","traffic-policy","out","' + policyname + '"]}',
            'key': 'vyosapikey'
        }
        headers = {}
        response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        linkresponse = response.status_code
        print(f"{linkresponse} -- traffic-Policy has applied to {interfacename}")

        if data["interface_status"]==False:
            payload = {
                'data': '{"op": "set", "path": ["interfaces","ethernet","' + interfacename + '","disable"]}',
                'key': 'vyosapikey'
            }
            headers = {}
            response = requests.request("POST", url, headers=headers, data=payload, verify=False)
            interface_status = response.status_code
            print(f"{interface_status} -- {interfacename} State link is down Now")
        else:
            payload = {
                'data': '{"op": "delete", "path": ["interfaces","ethernet","' + interfacename + '","disable"]}',
                'key': 'vyosapikey'
            }
            headers = {}
            response = requests.request("POST", url, headers=headers, data=payload, verify=False)
            interface_status = response.status_code
            print(f"{interface_status} -- {interfacename} State link is Up now")

        return jsonify(data)

# adding the defined resources along with their corresponding urls

api.add_resource(InterfaceStatus, '/trafficpolicy/<string:interfacename>')
api.add_resource(Parameters, '/parameters/<string:interfacename>')
api.add_resource(NetworkPolicy, '/trafficpolicy')


# driver function
if __name__ == '__main__':
    app.run(debug=True)
