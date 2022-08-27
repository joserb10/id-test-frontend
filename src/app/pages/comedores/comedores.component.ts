import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ComedorService } from 'src/app/services/comedor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comedores',
  templateUrl: './comedores.component.html',
  styleUrls: ['./comedores.component.css']
})
export class ComedoresComponent implements OnInit {
  array_comedores: any[] = [];
  submitted: boolean = false;
  formComedor: FormGroup;
  comedor_selected: any = null;
  to_save: boolean = false;
  buscar_text: string = '';

  p: number = 1;

  @ViewChild('btn') btn: ElementRef;

  constructor(private fb:FormBuilder, private come_s:ComedorService) { }

  ngOnInit(): void {
    this.formComedor = this.fb.group({
      nombre : ['', Validators.required],
      descripcion : [''],
    });

    this.come_s.getComedores().subscribe(
      (r) => {
        console.log(r);
        this.array_comedores = r['comedores'];
      },
      (e) => {
        console.log(e);
      },
      () => {
        console.log('Hecho');
      },
    )
  }

  crearComedor() {
    this.submitted = true;

    if (this.formComedor.invalid) {
      return
    }

    // this.array_comedores.push(this.formComedor.value);

    this.come_s.crearComedor(this.formComedor.value).subscribe(
      (r) => {
        console.log(r);
        this.array_comedores = r['comedores'];
      },
      (e) => {
        console.log(e);
      },
      () => {
        console.log('Creado');
        this.submitted = false;
        this.btn.nativeElement.click();
        this.formComedor.reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Comedor creado!',
          showConfirmButton: false,
          timer: 1600
        });
      }
    )
  }

  abrirNuevoModal() {
    this.formComedor.reset();
    this.to_save = true;
  }

  abrirEditarModal(comedor) {
    this.formComedor.patchValue(comedor);
    this.comedor_selected = comedor;
    this.to_save = false;
  }

  updateComedor() {
    if (this.formComedor.invalid) {
      return;
    }
    this.come_s.updateComedor({'form':this.formComedor.value, 'id':this.comedor_selected.id}).subscribe(
      (res) => {
        console.log(res);
        this.array_comedores = res['comedores'];
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('done');
        this.btn.nativeElement.click();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Comedor actualizado!',
          showConfirmButton: false,
          timer: 1600
        });
      }
    )
  }

  eliminarComedor(id, i) {
    Swal.fire({
      title: 'Está seguro?',
      text: "Al eliminar este comedor se eliminaran los comensales que le pertenecen!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.array_comedores.splice(i, 1);
        this.come_s.eliminarComedor({'id':id}).subscribe(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          },
          () => {
            console.log('done');
            Swal.fire(
              'Eliminado!',
              'El comedor ha sido borrado.',
              'success'
            )
          }
        )
      }
    })
  }

  searchComedores() {
    this.come_s.searchComedores(this.buscar_text).subscribe(
      (res) => {
        console.log(res);
        this.array_comedores = res['comedores'];
      },
      (err) => {
        console.log(err);
      },
      () => {
        console.log('done');
      }
    )
  }

  pageChanged(e) {
    this.p = e;
  }
}
