import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { BackendserviceService } from './backendservice.service';
import { User } from './parameters';
import { InterfaceName } from './parameters';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loader=true;
  interface="";
  BR1_ISP1_delay="0";
  BR1_ISP1_loss="0";
  BR1_ISP1_OOO="0";
  BR1_ISP1_corrupt="0";
  BR1_ISP1_selected: boolean = true;
  BR2_ISP1_delay="0";
  BR2_ISP1_loss="0";
  BR2_ISP1_OOO="0";
  BR2_ISP1_corrupt="0";
  BR2_ISP1_selected: boolean = true;
  DC1_ISP1_delay="0";
  DC1_ISP1_loss="0";
  DC1_ISP1_OOO="0";
  DC1_ISP1_corrupt="0";
  DC1_ISP1_selected: boolean = true;
  DC2_ISP1_delay="0";
  DC2_ISP1_loss="0";
  DC2_ISP1_OOO="0";
  DC2_ISP1_corrupt="0";
  DC2_ISP1_selected: boolean = true;
  BR1_ISP2_delay="0";
  BR1_ISP2_loss="0";
  BR1_ISP2_OOO="0";
  BR1_ISP2_corrupt="0";
  BR1_ISP2_selected: boolean = true;
  BR2_ISP2_delay="0";
  BR2_ISP2_loss="0";
  BR2_ISP2_OOO="0";
  BR2_ISP2_corrupt="0";
  BR2_ISP2_selected: boolean = true;
  DC1_ISP2_delay="0";
  DC1_ISP2_loss="0";
  DC1_ISP2_OOO="0";
  DC1_ISP2_corrupt="0";
  DC1_ISP2_selected: boolean = true;
  DC2_ISP2_delay="0";
  DC2_ISP2_loss="0";
  DC2_ISP2_OOO="0";
  DC2_ISP2_corrupt="0";
  DC2_ISP2_selected: boolean = true;
  BR1_MPLS_delay="0";
  BR1_MPLS_loss="0";
  BR1_MPLS_OOO="0";
  BR1_MPLS_corrupt="0";
  BR1_MPLS_selected: boolean = true;
  BR2_MPLS_delay="0";
  BR2_MPLS_loss="0";
  BR2_MPLS_OOO="0";
  BR2_MPLS_corrupt="0";
  BR2_MPLS_selected: boolean = true;
  DC1_MPLS_delay="0";
  DC1_MPLS_loss="0";
  DC1_MPLS_OOO="0";
  DC1_MPLS_corrupt="0";
  DC1_MPLS_selected: boolean = true;
  DC2_MPLS_delay="0";
  DC2_MPLS_loss="0";
  DC2_MPLS_OOO="0";
  DC2_MPLS_corrupt="0";
  DC2_MPLS_selected: boolean = true;
  user!: User;
  organizations: any;
  BR1_ISP1_submitbutton:boolean=false;
  BR2_ISP1_submitbutton:boolean=false;
  DC1_ISP1_submitbutton:boolean=false;
  DC2_ISP1_submitbutton:boolean=false;
  BR1_ISP2_submitbutton:boolean=false;
  BR2_ISP2_submitbutton:boolean=false;
  DC1_ISP2_submitbutton:boolean=false;
  DC2_ISP2_submitbutton:boolean=false;
  BR1_MPLS_submitbutton:boolean=false;
  BR2_MPLS_submitbutton:boolean=false;
  DC1_MPLS_submitbutton:boolean=false;
  DC2_MPLS_submitbutton:boolean=false;
  interfacestatus:any;
  parameters:any;
  

  constructor(private backendservice:BackendserviceService,private _router:Router){}

  ngOnInit(): void {
    console.log(this.loader)
    console.log("Welcome to VYOS Configuration")
    const InterfaceList = ["BR1_ISP1","BR2_ISP1","DC1_ISP1","DC2_ISP1","BR1_ISP2","BR2_ISP2","DC1_ISP2","DC2_ISP2","BR1_MPLS","BR2_MPLS","DC1_MPLS","DC2_MPLS"]
    for (let i of InterfaceList){
      this.backendservice.Parameters(i).subscribe(response =>{
      this.parameters=response;
      console.log(this.parameters)
      if (i=="BR1_ISP1"){
        this.BR1_ISP1_delay=this.parameters["network-delay"]
        this.BR1_ISP1_loss=this.parameters["packet-loss"]
        this.BR1_ISP1_OOO="0"
        this.BR1_ISP1_corrupt="0"
      }
      else if (i=="BR2_ISP1"){
        this.BR2_ISP1_delay=this.parameters["network-delay"]
        this.BR2_ISP1_loss=this.parameters["packet-loss"]
        this.BR2_ISP1_OOO="0"
        this.BR2_ISP1_corrupt="0"
      }
      else if (i=="DC1_ISP1"){
        this.DC1_ISP1_delay=this.parameters["network-delay"]
        this.DC1_ISP1_loss=this.parameters["packet-loss"]
        this.DC1_ISP1_OOO="0"
        this.DC1_ISP1_corrupt="0"
      }
      else if (i=="DC2_ISP1"){
        this.DC2_ISP1_delay=this.parameters["network-delay"]
        this.DC2_ISP1_loss=this.parameters["packet-loss"]
        this.DC2_ISP1_OOO="0"
        this.DC2_ISP1_corrupt="0"
      }

      else if (i=="BR1_ISP2"){
        this.BR1_ISP2_delay=this.parameters["network-delay"]
        this.BR1_ISP2_loss=this.parameters["packet-loss"]
        this.BR1_ISP2_OOO="0"
        this.BR1_ISP2_corrupt="0"
      }
      else if (i=="BR2_ISP2"){
        this.BR2_ISP2_delay=this.parameters["network-delay"]
        this.BR2_ISP2_loss=this.parameters["packet-loss"]
        this.BR2_ISP2_OOO="0"
        this.BR2_ISP2_corrupt="0"
      }
      else if (i=="DC1_ISP2"){
        this.DC1_ISP2_delay=this.parameters["network-delay"]
        this.DC1_ISP2_loss=this.parameters["packet-loss"]
        this.DC1_ISP2_OOO="0"
        this.DC1_ISP2_corrupt="0"
      }
      else if (i=="DC2_ISP2"){
        this.DC2_ISP2_delay=this.parameters["network-delay"]
        this.DC2_ISP2_loss=this.parameters["packet-loss"]
        this.DC2_ISP2_OOO="0"
        this.DC2_ISP2_corrupt="0"
      }

      else if (i=="BR1_MPLS"){
        this.BR1_MPLS_delay=this.parameters["network-delay"]
        this.BR1_MPLS_loss=this.parameters["packet-loss"]
        this.BR1_MPLS_OOO="0"
        this.BR1_MPLS_corrupt="0"
      }
      else if (i=="BR2_MPLS"){
        this.BR2_MPLS_delay=this.parameters["network-delay"]
        this.BR2_MPLS_loss=this.parameters["packet-loss"]
        this.BR2_MPLS_OOO="0"
        this.BR2_MPLS_corrupt="0"
      }
      else if (i=="DC1_MPLS"){
        this.DC1_MPLS_delay=this.parameters["network-delay"]
        this.DC1_MPLS_loss=this.parameters["packet-loss"]
        this.DC1_MPLS_OOO="0"
        this.DC1_MPLS_corrupt="0"
      }
      else if (i=="DC2_MPLS"){
        this.DC2_MPLS_delay=this.parameters["network-delay"]
        this.DC2_MPLS_loss=this.parameters["packet-loss"]
        this.DC2_MPLS_OOO="0"
        this.DC2_MPLS_corrupt="0"
      }

    })
  }

    for (let i of InterfaceList){
        
        this.backendservice.InterfaceStatus(i).subscribe(response =>{
        this.interfacestatus=response;
        console.log(i)
        console.log(this.interfacestatus)
        if (this.interfacestatus=="DOWN"){
          if (i=="BR1_ISP1"){
            this.BR1_ISP1_selected=false; 
          }
          else if (i=="BR2_ISP1"){
            this.BR2_ISP1_selected=false;
          }
          else if(i=="DC1_ISP1") {
            this.DC1_ISP1_selected=false; 
          } 
          else if(i=="DC2_ISP1") {
            this.DC2_ISP1_selected=false; 
          }   
          else if (i=="BR1_ISP2"){
            this.BR1_ISP2_selected=false;
          }
          else if (i=="BR2_ISP2"){
            this.BR2_ISP2_selected=false;
          }
          else if (i=="DC1_ISP2") {
            this.DC1_ISP2_selected=false;
          }
          else if(i=="DC2_ISP2") {
            this.DC2_ISP2_selected=false; 
          }  
          else if (i=="BR1_MPLS"){
            this.BR1_MPLS_selected=false;
          }
          else if (i=="BR2_MPLS") {
            this.BR2_MPLS_selected=false;
          }
          else if (i=="DC1_MPLS") {
            this.DC1_MPLS_selected=false;
          }
          else {
            this.DC2_MPLS_selected=false;
          }
        }

        setTimeout(() => {
          this.loader=false;
          console.log(this.loader)
         
          })
        
      })
    }
    
}

  Branch1_ISP1_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("Branch1-ISP1")
    this.BR1_ISP1_delay = val1;
    this.BR1_ISP1_loss = val2;
    this.BR1_ISP1_OOO = val3;
    this.BR1_ISP1_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.BR1_ISP1_delay))
    console.log(this.BR1_ISP1_selected)
    console.log(this.BR1_ISP1_delay,this.BR1_ISP1_loss,this.BR1_ISP1_OOO,this.BR1_ISP1_corrupt)

    this.user = {"interface":"ISP1_eth1","interface_status":this.BR1_ISP1_selected,"delay":this.BR1_ISP1_delay,"loss":this.BR1_ISP1_loss,"OOO":this.BR1_ISP1_OOO,"corrupt":this.BR1_ISP1_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.BR1_ISP1_submitbutton=false;
      console.log(this.BR1_ISP1_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("BR1_ISP1").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.BR1_ISP1_delay=this.parameters["network-delay"]
        this.BR1_ISP1_loss=this.parameters["packet-loss"]
        this.BR1_ISP1_OOO="0"
        this.BR1_ISP1_corrupt="0"
      })
  })
      this.BR1_ISP1_submitbutton=true;
      console.log(this.BR1_ISP1_submitbutton)
      // setTimeout(() => {
      //   },10000)

  }

  Branch2_ISP1_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("Branch2-ISP1")
    this.BR2_ISP1_delay = val1;
    this.BR2_ISP1_loss = val2;
    this.BR2_ISP1_OOO = val3;
    this.BR2_ISP1_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.BR2_ISP1_delay))
    console.log(this.BR2_ISP1_delay,this.BR2_ISP1_loss,this.BR2_ISP1_OOO,this.BR2_ISP1_corrupt)

    this.user = {"interface":"ISP1_eth2","interface_status":this.BR2_ISP1_selected,"delay":this.BR2_ISP1_delay,"loss":this.BR2_ISP1_loss,"OOO":this.BR2_ISP1_OOO,"corrupt":this.BR2_ISP1_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.BR2_ISP1_submitbutton=false;
      console.log(this.BR2_ISP1_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("BR2_ISP1").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.BR2_ISP1_delay=this.parameters["network-delay"]
        this.BR2_ISP1_loss=this.parameters["packet-loss"]
        this.BR2_ISP1_OOO="0"
        this.BR2_ISP1_corrupt="0"
      })
    })
    this.BR2_ISP1_submitbutton=true;
    console.log(this.BR2_ISP1_submitbutton)
    // setTimeout(() => {
    //   },10000)

  }

  DC1_ISP1_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("DC1-ISP1")
    this.DC1_ISP1_delay = val1;
    this.DC1_ISP1_loss = val2;
    this.DC1_ISP1_OOO = val3;
    this.DC1_ISP1_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.DC1_ISP1_delay))
    console.log(this.DC1_ISP1_delay,this.DC1_ISP1_loss,this.DC1_ISP1_OOO,this.DC1_ISP1_corrupt)

    this.user = {"interface":"ISP1_eth3","interface_status":this.DC1_ISP1_selected,"delay":this.DC1_ISP1_delay,"loss":this.DC1_ISP1_loss,"OOO":this.DC1_ISP1_OOO,"corrupt":this.DC1_ISP1_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.DC1_ISP1_submitbutton=false;
      console.log(this.DC1_ISP1_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("DC1_ISP1").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.DC1_ISP1_delay=this.parameters["network-delay"]
        this.DC1_ISP1_loss=this.parameters["packet-loss"]
        this.DC1_ISP1_OOO="0"
        this.DC1_ISP1_corrupt="0"
      })
    })
    this.DC1_ISP1_submitbutton=true;
    console.log(this.DC1_ISP1_submitbutton)
    
    // setTimeout(() => {
    //   },25000)

  }

  DC2_ISP1_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("DC2-ISP1")
    this.DC2_ISP1_delay = val1;
    this.DC2_ISP1_loss = val2;
    this.DC2_ISP1_OOO = val3;
    this.DC2_ISP1_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.DC2_ISP1_delay))
    console.log(this.DC2_ISP1_delay,this.DC2_ISP1_loss,this.DC2_ISP1_OOO,this.DC2_ISP1_corrupt)

    this.user = {"interface":"ISP1_eth0","interface_status":this.DC2_ISP1_selected,"delay":this.DC2_ISP1_delay,"loss":this.DC2_ISP1_loss,"OOO":this.DC2_ISP1_OOO,"corrupt":this.DC2_ISP1_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.DC2_ISP1_submitbutton=false;
      console.log(this.DC2_ISP1_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("DC2_ISP1").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.DC2_ISP1_delay=this.parameters["network-delay"]
        this.DC2_ISP1_loss=this.parameters["packet-loss"]
        this.DC2_ISP1_OOO="0"
        this.DC2_ISP1_corrupt="0"
      })
    })
    this.DC2_ISP1_submitbutton=true;
    console.log(this.DC2_ISP1_submitbutton)
    
    // setTimeout(() => {
    //   },25000)

  }

  Branch1_ISP2_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("Branch1_ISP2")
    this.BR1_ISP2_delay = val1;
    this.BR1_ISP2_loss = val2;
    this.BR1_ISP2_OOO = val3;
    this.BR1_ISP2_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.BR1_ISP2_delay))
    console.log(this.BR1_ISP2_delay,this.BR1_ISP2_loss,this.BR1_ISP2_OOO,this.BR1_ISP2_corrupt)

    this.user = {"interface":"ISP2_eth1","interface_status":this.BR1_ISP2_selected,"delay":this.BR1_ISP2_delay,"loss":this.BR1_ISP2_loss,"OOO":this.BR1_ISP2_OOO,"corrupt":this.BR1_ISP2_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.BR1_ISP2_submitbutton=false;
      console.log(this.BR1_ISP2_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("BR1_ISP2").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.BR1_ISP2_delay=this.parameters["network-delay"]
        this.BR1_ISP2_loss=this.parameters["packet-loss"]
        this.BR1_ISP2_OOO="0"
        this.BR1_ISP2_corrupt="0"
      })
  })
      this.BR1_ISP2_submitbutton=true;
      console.log(this.BR1_ISP2_submitbutton)
      // setTimeout(() => {
      //   },10000)

  }

  Branch2_ISP2_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("Branch2_ISP2")
    this.BR2_ISP2_delay = val1;
    this.BR2_ISP2_loss = val2;
    this.BR2_ISP2_OOO = val3;
    this.BR2_ISP2_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.BR2_ISP2_delay))
    console.log(this.BR2_ISP2_delay,this.BR2_ISP2_loss,this.BR2_ISP2_OOO,this.BR2_ISP2_corrupt)

    this.user = {"interface":"ISP2_eth2","interface_status":this.BR2_ISP2_selected,"delay":this.BR2_ISP2_delay,"loss":this.BR2_ISP2_loss,"OOO":this.BR2_ISP2_OOO,"corrupt":this.BR2_ISP2_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.BR2_ISP2_submitbutton=false;
      console.log(this.BR2_ISP2_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("BR2_ISP2").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.BR2_ISP2_delay=this.parameters["network-delay"]
        this.BR2_ISP2_loss=this.parameters["packet-loss"]
        this.BR2_ISP2_OOO="0"
        this.BR2_ISP2_corrupt="0"
      })
  })
      this.BR2_ISP2_submitbutton=true;
      console.log(this.BR2_ISP2_submitbutton)
      // setTimeout(() => {
      //   },10000)

  }

  DC1_ISP2_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("DC1_ISP2")
    this.DC1_ISP2_delay = val1;
    this.DC1_ISP2_loss = val2;
    this.DC1_ISP2_OOO = val3;
    this.DC1_ISP2_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.DC1_ISP2_delay))
    console.log(this.DC1_ISP2_delay,this.DC1_ISP2_loss,this.DC1_ISP2_OOO,this.DC1_ISP2_corrupt)

    this.user = {"interface":"ISP2_eth3","interface_status":this.DC1_ISP2_selected,"delay":this.DC1_ISP2_delay,"loss":this.DC1_ISP2_loss,"OOO":this.DC1_ISP2_OOO,"corrupt":this.DC1_ISP2_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.DC1_ISP2_submitbutton=false;
      console.log(this.DC1_ISP2_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("DC1_ISP2").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.DC1_ISP2_delay=this.parameters["network-delay"]
        this.DC1_ISP2_loss=this.parameters["packet-loss"]
        this.DC1_ISP2_OOO="0"
        this.DC1_ISP2_corrupt="0"
      })
  })
      this.DC1_ISP2_submitbutton=true;
      console.log(this.DC1_ISP2_submitbutton)
      // setTimeout(() => {
      //   },10000)

  }

  DC2_ISP2_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("DC2_ISP2")
    this.DC2_ISP2_delay = val1;
    this.DC2_ISP2_loss = val2;
    this.DC2_ISP2_OOO = val3;
    this.DC2_ISP2_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.DC2_ISP2_delay))
    console.log(this.DC2_ISP2_delay,this.DC2_ISP2_loss,this.DC2_ISP2_OOO,this.DC2_ISP2_corrupt)

    this.user = {"interface":"ISP2_eth0","interface_status":this.DC2_ISP2_selected,"delay":this.DC2_ISP2_delay,"loss":this.DC2_ISP2_loss,"OOO":this.DC2_ISP2_OOO,"corrupt":this.DC2_ISP2_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.DC2_ISP2_submitbutton=false;
      console.log(this.DC2_ISP2_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("DC2_ISP2").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.DC2_ISP2_delay=this.parameters["network-delay"]
        this.DC2_ISP2_loss=this.parameters["packet-loss"]
        this.DC2_ISP2_OOO="0"
        this.DC2_ISP2_corrupt="0"
      })
  })
      this.DC2_ISP2_submitbutton=true;
      console.log(this.DC2_ISP2_submitbutton)
      // setTimeout(() => {
      //   },10000)

  }

  Branch1_MPLS_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("Branch1_MPLS")
    this.BR1_MPLS_delay = val1;
    this.BR1_MPLS_loss = val2;
    this.BR1_MPLS_OOO = val3;
    this.BR1_MPLS_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.BR1_MPLS_delay))
    console.log(this.BR1_MPLS_delay,this.BR1_MPLS_loss,this.BR1_MPLS_OOO,this.BR1_MPLS_corrupt)

    this.user = {"interface":"MPLS_eth1","interface_status":this.BR1_MPLS_selected,"delay":this.BR1_MPLS_delay,"loss":this.BR1_MPLS_loss,"OOO":this.BR1_MPLS_OOO,"corrupt":this.BR1_MPLS_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.BR1_MPLS_submitbutton=false;
      console.log(this.BR1_MPLS_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("BR1_MPLS").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.BR1_MPLS_delay=this.parameters["network-delay"]
        this.BR1_MPLS_loss=this.parameters["packet-loss"]
        this.BR1_MPLS_OOO="0"
        this.BR1_MPLS_corrupt="0"
      })
  })
      this.BR1_MPLS_submitbutton=true;
      console.log(this.BR1_MPLS_submitbutton)
      // setTimeout(() => {
      //   },10000)

  }

  Branch2_MPLS_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("Branch2_MPLS")
    this.BR2_MPLS_delay = val1;
    this.BR2_MPLS_loss = val2;
    this.BR2_MPLS_OOO = val3;
    this.BR2_MPLS_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.BR2_MPLS_delay))
    console.log(this.BR2_MPLS_delay,this.BR2_MPLS_loss,this.BR2_MPLS_OOO,this.BR2_MPLS_corrupt)

    this.user = {"interface":"MPLS_eth2","interface_status":this.BR2_MPLS_selected,"delay":this.BR2_MPLS_delay,"loss":this.BR2_MPLS_loss,"OOO":this.BR2_MPLS_OOO,"corrupt":this.BR2_MPLS_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.BR2_MPLS_submitbutton=false;
      console.log(this.BR2_MPLS_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("BR2_MPLS").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.BR2_MPLS_delay=this.parameters["network-delay"]
        this.BR2_MPLS_loss=this.parameters["packet-loss"]
        this.BR2_MPLS_OOO="0"
        this.BR2_MPLS_corrupt="0"
      })
  })
      this.BR2_MPLS_submitbutton=true;
      console.log(this.BR2_MPLS_submitbutton)
      // setTimeout(() => {
      //   },10000)

  }

  DC1_MPLS_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("DC1_MPLS")
    this.DC1_MPLS_delay = val1;
    this.DC1_MPLS_loss = val2;
    this.DC1_MPLS_OOO = val3;
    this.DC1_MPLS_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.DC1_MPLS_delay))
    console.log(this.DC1_MPLS_delay,this.DC1_MPLS_loss,this.DC1_MPLS_OOO,this.DC1_MPLS_corrupt)

    this.user = {"interface":"MPLS_eth3","interface_status":this.DC1_MPLS_selected,"delay":this.DC1_MPLS_delay,"loss":this.DC1_MPLS_loss,"OOO":this.DC1_MPLS_OOO,"corrupt":this.DC1_MPLS_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.DC1_MPLS_submitbutton=false;
      console.log(this.DC1_MPLS_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("DC1_MPLS").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.DC1_MPLS_delay=this.parameters["network-delay"]
        this.DC1_MPLS_loss=this.parameters["packet-loss"]
        this.DC1_MPLS_OOO="0"
        this.DC1_MPLS_corrupt="0"
      })
    })
    this.DC1_MPLS_submitbutton=true;
    console.log(this.DC1_MPLS_submitbutton)
    
    // setTimeout(() => {
    //   },25000)

  }

  DC2_MPLS_Selected(val1:string,val2:string,val3:string,val4:string){
    console.log("DC2_MPLS")
    this.DC2_MPLS_delay = val1;
    this.DC2_MPLS_loss = val2;
    this.DC2_MPLS_OOO = val3;
    this.DC2_MPLS_corrupt = val4;
    console.log(typeof(val1))
    console.log(typeof(this.DC2_MPLS_delay))
    console.log(this.DC2_MPLS_delay,this.DC2_MPLS_loss,this.DC2_MPLS_OOO,this.DC2_MPLS_corrupt)

    this.user = {"interface":"MPLS_eth0","interface_status":this.DC2_MPLS_selected,"delay":this.DC2_MPLS_delay,"loss":this.DC2_MPLS_loss,"OOO":this.DC2_MPLS_OOO,"corrupt":this.DC2_MPLS_corrupt}
    this.backendservice.NetworkTraffic(this.user).subscribe(response =>{
      this.user = response;
      this.DC2_MPLS_submitbutton=false;
      console.log(this.DC2_MPLS_submitbutton)
      console.log(this.user)
      this.backendservice.Parameters("DC2_MPLS").subscribe(response =>{
        this.parameters=response;
        console.log(this.parameters)
        this.DC2_MPLS_delay=this.parameters["network-delay"]
        this.DC2_MPLS_loss=this.parameters["packet-loss"]
        this.DC2_MPLS_OOO="0"
        this.DC2_MPLS_corrupt="0"
      })
    })
    this.DC2_MPLS_submitbutton=true;
    console.log(this.DC2_MPLS_submitbutton)
    
    // setTimeout(() => {
    //   },25000)

  }

 } 