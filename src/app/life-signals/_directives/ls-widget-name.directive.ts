import { Directive, Input, TemplateRef } from "@angular/core";

@Directive({
  selector: "[lsWidgetName]",
})
export class LsWidgetNameDirective {
  @Input() type: string;

  @Input() lsWidgetName: string;

  constructor(public template: TemplateRef<any>) {}

  getName(): string {
    return this.lsWidgetName;
  }
  getType(): string {
    return this.type;
  }
}
