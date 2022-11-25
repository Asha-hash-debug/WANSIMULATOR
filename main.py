from flask import Flask, jsonify, request, render_template
from flask_restful import Resource, Api
from flask_cors import CORS,cross_origin
import requests
import json
from requests.packages.urllib3.exceptions import InsecureRequestWarning

# disable warnings in requests for cert bypass
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)
# creating the flask app
app = Flask(__name__)
CORS(app)
# creating an API object
api = Api(app)

@app.route('/')
def hello_world():
    return render_template("index.html")

Router1 = "128.66.0.2"
Router2 = "128.66.0.3"
Router3 = "128.66.0.4"

class InterfaceAndParametersStatus(Resource):
    def get(self, interfacename):

        if "ISP1" in interfacename:
            interfacestatusurl = "https://" + Router1 + "/show"
            parametersurl = "https://" + Router1 + "/retrieve"

            if "BR1" in interfacename:
                interface = "eth1"
                policyname = "Policy1"

            elif "BR2" in interfacename:
                interface = "eth2"
                policyname = "Policy2"

            elif "DC1" in interfacename:
                interface = "eth3"
                policyname = "Policy3"

            else:
                interface = "eth4"
                policyname = "Policy4"

        elif "ISP2" in interfacename:
            interfacestatusurl = "https://" + Router2 + "/show"
            parametersurl = "https://" + Router2 + "/retrieve"

            if "BR1" in interfacename:
                interface = "eth1"
                policyname = "Policy1"

            elif "BR2" in interfacename:
                interface = "eth2"
                policyname = "Policy2"

            elif "DC1" in interfacename:
                interface = "eth3"
                policyname = "Policy3"

            else:
                interface = "eth4"
                policyname = "Policy4"

        else:
            interfacestatusurl = "https://" + Router3 + "/show"
            parametersurl = "https://" + Router3 + "/retrieve"

            if "BR1" in interfacename:
                interface = "eth1"
                policyname = "Policy1"

            elif "BR2" in interfacename:
                interface = "eth2"
                policyname = "Policy2"

            elif "DC1" in interfacename:
                interface = "eth3"
                policyname = "Policy3"

            else:
                interface = "eth4"
                policyname = "Policy4"

        payload = {'data': '{"op": "show", "path": ["interfaces","ethernet","' + interface + '"]}',
                   'key': 'vyosapikey'
                   }
        headers = {}
        response = requests.request("POST", interfacestatusurl, headers=headers, data=payload, verify=False)
        print(f'{interfacename} -- {response.status_code} -- Fetched Ethernet Interface Status')
        gets = response.json()
        finds = gets["data"]

        payload = {'data': '{"op": "showConfig", "path": ["traffic-policy","network-emulator","' + policyname + '"]}',
                   'key': 'vyosapikey'
                   }
        headers = {}
        dict = {}
        response = requests.request("POST", parametersurl, headers=headers, data=payload, verify=False)
        response1 = response.text
        response2 = json.loads(response1)

        if response2['success']:
            dict["network-delay"] = response2["data"]["network-delay"].strip("ms")
            dict["packet-loss"] = response2["data"]["packet-loss"].strip("%")
            print(f"{dict} exist in {policyname}")
        else:
            dict["network-delay"] = 0
            dict["packet-loss"] = 0

        if finds.find(",UP") == -1:
            print(f"{interface} is DOWN -- with traffic-parameters {dict}")
            return ["DOWN", dict]
        else:
            print(f"{interface} is UP -- with traffic-parameters {dict}")
            return ["UP", dict]


class NetworkPolicy(Resource):
    def post(self):
        data = (request.json)

        if ("ISP1" in data["interface"]):
            url = "https://"+Router1+"/configure"
        elif ("ISP2" in data["interface"]):
            url = "https://"+Router2+"/configure"
        else:
            url = "https://"+Router3+"/configure"
        if ("eth1" in data["interface"]):
            policyname="Policy1"
            interfacename="eth1"
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


api.add_resource(InterfaceAndParametersStatus, '/initial-config/<string:interfacename>')
api.add_resource(NetworkPolicy, '/traffic-policy')



# driver function
if __name__ == '__main__':
    app.run(debug=True)
