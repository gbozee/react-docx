import { Document, Table, Paragraph, TextRun, TableCell } from "@gbozee/docx";

let styling = {
  heading: {}
};
class ResumeCreator {
  experiences: any[];
  skills: object[];
  educations: any[];
  achivements: object[];
  document: Document;
  personal_info: any;
  constructor(data: object[], personal_info: any) {
    this.experiences = data[0] as any[];
    this.educations = data[1] as any[];
    this.skills = data[2] as object[];
    this.achivements = data[3] as object[];
    this.document = new Document();
    this.personal_info = personal_info;
  }

  public createHeading(node: Document | TableCell) {
    let { address, full_name, headline } = this.personal_info;
    let values: { [key: string]: string } = {
      phoneNumber: "Mobile",
      profileUrl: "Linkedin",
      email: "Email"
    };
    let result = [];
    for (let i in this.personal_info) {
      if (Object.keys(values).includes(i)) {
        result.push(`${values[i]}: ${this.personal_info[i]}`);
      }
    }
    node
      .addParagraph(new Paragraph(full_name).title())
      .addParagraph(new Paragraph(headline).style("headlineStyle"))
      .addParagraph(
        new Paragraph()
          .center()
          .addRun(new TextRun(result.join(" | ")))
          .addRun(new TextRun(address).break())
      );
  }
  public buildResume() {
    this.createHeading(this.document);
  }
}
