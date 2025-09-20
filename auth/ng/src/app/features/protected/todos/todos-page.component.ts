import {Component, inject, ViewChild, ElementRef} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {FolderService} from '../../../signal/folder.service';
import {TodoService} from '../../../signal/todo.service';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {AnimateOnScroll} from 'primeng/animateonscroll';

@Component({
  selector: 'app-todos-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, ReactiveFormsModule, InputText, AnimateOnScroll],
  templateUrl: './todo.html',
  styleUrls: ['./todo.css']
})
export class TodosPageComponent {
  folderService = inject(FolderService);
  todoService = inject(TodoService);
  route = inject(ActivatedRoute);
  @ViewChild('todoInput') todoInput!: ElementRef<HTMLInputElement>;
  profileForm = new FormGroup({
    newTodo: new FormControl('', Validators.required),
  });

  constructor() {
    this.route.paramMap.subscribe(params => {
      const folderId = Number(params.get('id'));
      this.folderService.setFolderID(folderId);
      this.todoService.loadTodos(folderId).then();
    });
  }

  async deleteTodo(id: number) {
    await this.todoService.deleteTodo(id);
  }

  async onSubmit() {
    const folderId = this.folderService.folderID();
    if (folderId && this.profileForm.value.newTodo) {
      await this.todoService.createTodo({
        name: this.profileForm.value.newTodo,
        folderId: folderId
      });
      this.profileForm.reset();
      if (this.todoInput) this.todoInput.nativeElement.focus();
    }
  }
}
