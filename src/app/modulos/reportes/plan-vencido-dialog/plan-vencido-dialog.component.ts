import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';

@Component({
  selector: 'app-plan-vencido-dialog',
  templateUrl: './plan-vencido-dialog.component.html',
  styleUrls: ['./plan-vencido-dialog.component.css']
})
export class PlanVencidoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { nombre: string },
    public dialogRef: MatDialogRef<PlanVencidoDialogComponent>
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
