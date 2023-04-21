from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin
import requests
import json
from urllib3.exceptions import InsecureRequestWarning
from datetime import datetime

#  disable warnings in requests for cert bypass
requests.packages.urllib3.disable_warnings(InsecureRequestWarning)

# creating the flask app
app = Flask(__name__)
CORS(app)


@app.route('/')
def hello_world():
    return render_template("index.html")


Router1 = "192.168.0.101"
Router2 = "192.168.0.102"
Router3 = "192.168.0.103"


@app.route('/initial-config/<string:interfacename>')
def get(interfacename):
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

    payload = {'data': '{"op": "showConfig", "path": ["traffic-policy","network-emulator","' + policyname + '"]}',
               'key': 'vyosapikey'
               }
    headers = {}
    dict = {}

    try:
        response = requests.request("POST", parametersurl, headers=headers, data=payload, verify=False)
        print(f'{response.status_code} - traffic {interface} {policyname}')
        if (response.status_code == 200):
            response1 = response.text
            response2 = json.loads(response1)

            if response2['success']:
                dict["network-delay"] = response2["data"]["network-delay"].strip("ms")
                dict["packet-loss"] = response2["data"]["packet-loss"].strip("%")
                print(f"{dict} exist in {policyname}")
        else:
            dict["network-delay"] = 0
            dict["packet-loss"] = 0
    except requests.exceptions.RequestException as e:
        print(e)
        dict["network-delay"] = 0
        dict["packet-loss"] = 0
        return ["UP",dict]

    payload = {'data': '{"op": "show", "path": ["interfaces","ethernet","' + interface + '"]}',
               'key': 'vyosapikey'
               }
    headers = {}
    try:

        response = requests.request("POST", interfacestatusurl, headers=headers, data=payload, verify=False)
        print(f'{response.status_code} - interface status {interface}')
        if (response.status_code == 200):
            print(f'{interfacename} -- {response.status_code} -- Fetched Ethernet Interface Status')
            gets = response.json()
            finds = gets["data"]

            if finds.find(",UP") == -1:
                print(f"{interface} is DOWN -- with traffic-parameters {dict}")
                return ["DOWN",dict]
            else:
                print(f"{interface} is UP -- with traffic-parameters {dict}")
                return ["UP",dict]
        else:
            return ["UP",dict]
    except requests.exceptions.RequestException as e:
        print(e)
        return ["UP",dict]


@app.route('/traffic-policy', methods=["POST"])
def post():
    data = request.json
    print(data)

    if "ISP1" in data["interface"]:
        url = "https://" + Router1 + "/configure"

    elif "ISP2" in data["interface"]:
        url = "https://" + Router2 + "/configure"

    else:
        url = "https://" + Router3 + "/configure"

    if "eth1" in data["interface"]:
        policyname = "Policy1"
        interfacename = "eth1"

    elif "eth2" in data["interface"]:
        policyname = "Policy2"
        interfacename = "eth2"

    elif "eth3" in data["interface"]:
        policyname = "Policy3"
        interfacename = "eth3"

    else:
        policyname = "Policy4"
        interfacename = "eth4"

    try:
        payload = {
            'data': '{"op": "set", "path": ["traffic-policy","network-emulator","' + policyname + '","network-delay","' + str(
                data["delay"]) + 'ms"]}',
            'key': 'vyosapikey'
        }
        headers = {}
        response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        delayresponse = response.status_code
        print(f"{delayresponse} -- Network-Delay value Configured")

        payload = {
            'data': '{"op": "set", "path": ["traffic-policy","network-emulator","' + policyname + '","packet-loss","' + str(
                data["loss"]) + '%"]}',
            'key': 'vyosapikey'
        }
        headers = {}

        response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        lossresponse = response.status_code
        print(f"{lossresponse} -- Packet-Loss value Configured")

        payload = {
            'data': '{"op": "set", "path": ["interfaces","ethernet","' + interfacename + '","traffic-policy","out","' + policyname + '"]}',
            'key': 'vyosapikey'
        }
        headers = {}
        response = requests.request("POST", url, headers=headers, data=payload, verify=False)
        linkresponse = response.status_code
        print(f"{linkresponse} -- traffic-Policy has applied to {interfacename}")

        if data["interface_status"] == False:
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

    except requests.exceptions.RequestException as e:
        print(e)
        return "0"

# driver function
if __name__ == '__main__':
    app.run(debug=True)
