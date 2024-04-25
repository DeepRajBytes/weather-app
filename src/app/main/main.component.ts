import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  sunriseTime: any;
  sunsetTime:any;
  wind:any
  palace:any
  temperature: number = 0;
  condition: string = '';
  isDay: boolean = true;
  humidity:any
  constructor(private http: HttpClient,private formbuilder:FormBuilder) {}
 

  form:FormGroup = this.formbuilder.group({
    city:['']
  })

  submitForm() {
    const city = this.form.get('city')?.value;
    
    if (city) {
      const apiKey = '2bacea3e1c7305e30b11c9d0c41a9100';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
      this.http.get(url).subscribe(
        (data: any) => {
          
          this.temperature = data.main.temp;
          this.condition = data.weather[0].description;
          this.palace = data.name;
          this.wind = data.wind.speed;
          this.humidity = data.main.humidity;
  
          const sunrise = new Date(data.sys.sunrise * 1000);
          const sunset = new Date(data.sys.sunset * 1000);
          this.sunriseTime = sunrise.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          });
  
          this.sunsetTime = sunset.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
          });
          const now = new Date();
  
          this.isDay = now > sunrise && now < sunset;
        },
        (error) => {
          
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `City not found or an error occurred`,
          });
        }
      );
    }
  }
  

  ngOnInit(): void {
    const city = 'ratlam'
     
    if (city) {
      const apiKey = '2bacea3e1c7305e30b11c9d0c41a9100';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

      this.http.get(url).subscribe((data: any) => {
        console.log("this one got",data);
        this.temperature = data.main.temp;
        this.condition = data.weather[0].description;
        this.palace=data.name
        this.wind = data.wind.speed
        this.humidity = data.main.humidity;

        
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);
        this.sunriseTime = sunrise.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        });
    
        this.sunsetTime = sunset.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        });
        const now = new Date();

        this.isDay = now > sunrise && now < sunset;
      });
    }
  
  }
}
