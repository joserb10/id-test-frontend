import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notesgroup',
  templateUrl: './notesgroup.component.html',
  styleUrls: ['./notesgroup.component.css']
})
export class NotesgroupComponent implements OnInit {
  array_notes: any[] = [];
  groupId: number = null;
  selectedFile: File = null;
  image: any = null;
  formNote: FormGroup;
  group: {} = null;
  submitted: boolean = false;
  user: {} = null;
  date_from: Date = null;
  date_to: Date = null;

  @ViewChild('closeModal') closeModal: ElementRef;
  constructor(private note_s: NoteService, private route: ActivatedRoute, private fb: FormBuilder) {
    this.formNote = this.fb.group({
      title: ['', Validators.required],
      description : ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    const routeParams = this.route.snapshot.paramMap;
    this.groupId = Number(routeParams.get('id'));

    this.note_s.getNotesByGroup({'group_id':this.groupId,'user_id':this.user['id']}).subscribe(
      (r) => {
        console.log(r);
        this.array_notes = r['notes'];
        this.group = r['group'];
      },
      (e) => {
        console.log(e);
      },
      () => {
        console.log('Hecho');
      },
    )
  }

  onFileSelect(event): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.image = myReader.result;
    }
    myReader.readAsDataURL(this.selectedFile);
    //convert to base64 ends
  }

  createNote() {
    this.submitted = true;
    console.log(this.formNote)
    if(!this.formNote.valid) {
      return
    }

    this.note_s.createNote({'title': this.formNote.controls['title'].value,
                            'description': this.formNote.controls['description'].value,
                            'image': this.image,
                            'group_id': this.groupId,
                            'user_id': this.user['id']
                            }).subscribe(
      (r) => {
        console.log(r);
        this.array_notes = r['notes'];
        Swal.fire({
          position: 'top-left',
          background: '#17E364',
          customClass: 'swal-small-cart',
          title: 'Nota creada correctamente!',
          showConfirmButton: false,
          timer: 1300
        });
      },
      (e) => {
        console.log(e);
      },
      () => {
        console.log('Hecho');
        this.formNote.reset();
        this.image = null;
        this.submitted= false;
        this.closeModal.nativeElement.click();
      },
    )
  }

  getNotesByDate() {
    if(!this.date_from || !this.date_to || this.date_from > this.date_to) {
      Swal.fire({
        position: 'top-left',
        background: '#FF5733',
        customClass: 'swal-small-cart',
        title: 'La fecha Desde debe ser menor a la fecha Hasta!',
        showConfirmButton: false,
        timer: 1300
      });
      return
    }

    this.note_s.getNotesByDate({'date_from':this.date_from,'date_to':this.date_to,'group_id':this.groupId}).subscribe(
      (r) => {
        console.log(r);
        if(r['notes'].length>0) {
          this.array_notes = r['notes'];
          Swal.fire({
            position: 'top-left',
            background: '#17E364',
            customClass: 'swal-small-cart',
            title: 'Se filtró las notas correctamente!',
            showConfirmButton: false,
            timer: 1300
          });
        } else {
          Swal.fire({
            position: 'top-left',
            background: '#FF5733',
            customClass: 'swal-small-cart',
            title: 'No existen notas con este filtro!',
            showConfirmButton: false,
            timer: 1300
          });
        }
      },
      (e) => {
        console.log(e);
      },
      () => {
        console.log('Hecho');
      },
    )
  }

  getNotesWithImage() {
    this.note_s.getNotesWithImage({'group_id':this.groupId}).subscribe(
      (r) => {
        console.log(r);
        if(r['notes'].length>0) {
          this.array_notes = r['notes'];
          Swal.fire({
            position: 'top-left',
            background: '#17E364',
            customClass: 'swal-small-cart',
            title: 'Se filtró las notas correctamente!',
            showConfirmButton: false,
            timer: 1300
          });
        } else {
          Swal.fire({
            position: 'top-left',
            background: '#FF5733',
            customClass: 'swal-small-cart',
            title: 'No existen notas con este filtro!',
            showConfirmButton: false,
            timer: 1300
          });
        }
      },
      (e) => {
        console.log(e);
      },
      () => {
        console.log('Hecho');
      },
    )
  }

}
