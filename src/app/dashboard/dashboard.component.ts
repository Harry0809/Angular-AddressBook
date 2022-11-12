import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { ContactServicesService } from '../contact-services.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  allcontactList:Array<any> = [];

  constructor(private contactService: ContactServicesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllContacts();
  }

  btnClick=  () => {
    this.router.navigateByUrl('/form');
  };

  getAllContacts(){    
    this.contactService.getAllContacts().subscribe((data:any) => {
      console.log(data);
      this.allcontactList=data;
      console.log(this.allcontactList);
      this.allcontactList = data.content;
    });
  }

  deleteContactByID(Id:number){
    console.log(Id);
    this.contactService.deleteContact(Id).subscribe((response:any) =>{
      this.ngOnInit();
      this.router.navigate(['dashboard']);      
    }); 
  }
  editById(Id:number){
    console.log(Id)
    let contact = this.allcontactList.find((contact)=>{return contact.id === Id})
    console.log(contact);
    this.router.navigate(['/update', Id]);
  }
  
}


