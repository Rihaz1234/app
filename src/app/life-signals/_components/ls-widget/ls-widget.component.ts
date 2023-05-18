import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from "@angular/core";

@Component({
  selector: "ls-widget",
  templateUrl: "./ls-widget.component.html",
  styleUrls: ["./ls-widget.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LsWidgetComponent {
  @Input() value: any;
  @Input() lsTemplate: TemplateRef<any>;

  constructor() {}
}
