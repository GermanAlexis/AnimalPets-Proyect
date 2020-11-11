import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ElephantService } from '../../service/elephant.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private auth: ElephantService
  ) {}

  public loginForm = this.fb.group({
    email: ['animalpets@correo.com', [Validators.required, Validators.email]],
    password: ['+123456+', Validators.required],
  });

  login() {
    if (this.loginForm.invalid) {
      return;
    }
    this.auth.login(this.loginForm.value).subscribe((resp: any) => {
      Swal.fire('En Buena Hora', resp.msg, 'success');
      this.router.navigate(['/elephant']);
    }, (err) => {Swal.fire('Error!', err.error.msg, 'error'); });
  }
}
