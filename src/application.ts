import * as fs from "fs";
import {
  Document,
  Paragraph,
  TextRun,
  ParagraphStyle,
  Packer,
  TableCell,
  CustomFont
} from "@gbozee/docx";

const experiences = [
  {
    isCurrent: true,
    summary:
      "Full-stack developer working with Angular and Java. Working for the iShares platform",
    title: "Associate Software Developer",
    startDate: {
      month: 11,
      year: 2017
    },
    company: {
      name: "BlackRock"
    }
  },
  {
    isCurrent: false,
    summary:
      "Full-stack developer working with Angular, Node and TypeScript. Working for the iShares platform. Emphasis on Dev-ops and developing the continous integration pipeline.",
    title: "Software Developer",
    endDate: {
      month: 11,
      year: 2017
    },
    startDate: {
      month: 10,
      year: 2016
    },
    company: {
      name: "Torch Markets"
    }
  },
  {
    isCurrent: false,
    summary:
      "Used ASP.NET MVC 5 to produce a diversity data collection tool for the future of British television.\n\nUsed AngularJS and C# best practices. Technologies used include JavaScript, ASP.NET MVC 5, SQL, Oracle, SASS, Bootstrap, Grunt.",
    title: "Software Developer",
    endDate: {
      month: 10,
      year: 2016
    },
    startDate: {
      month: 3,
      year: 2015
    },
    company: {
      name: "Soundmouse"
    }
  },
  {
    isCurrent: false,
    summary:
      "Develop web commerce platforms for various high profile clients.\n\nCreated a log analysis web application with the Play Framework in Java, incorporating Test Driven Development. It asynchronously uploads and processes large (2 GB) log files, and outputs meaningful results in context with the problem. \n\nAnalysis  and  development  of  the payment system infrastructure and user accounts section to be used by several clients of the company such as Waitrose, Tally Weijl, DJ Sports, Debenhams, Ann Summers, John Lewis and others.\n\nTechnologies used include WebSphere Commerce, Java, JavaScript and JSP.",
    title: "Java Developer",
    endDate: {
      month: 10,
      year: 2014
    },
    startDate: {
      month: 3,
      year: 2013
    },
    company: {
      name: "Soundmouse"
    }
  }
];

const education = [
  {
    degree: "Master of Science (MSc)",
    fieldOfStudy: "Computer Science",
    notes:
      "Exam Results: 1st Class with Distinction, Dissertation: 1st Class with Distinction\n\nRelevant Courses: Java and C# Programming, Software Engineering, Artificial Intelligence, \nComputational Photography, Algorithmics, Architecture and Hardware.\n\nCreated a Windows 8 game in JavaScript for the dissertation. \n\nCreated an award-winning 3D stereoscopic game in C# using XNA.",
    schoolName: "University College London",
    startDate: {
      year: 2012
    },
    endDate: {
      year: 2013
    }
  },
  {
    degree: "Bachelor of Engineering (BEng)",
    fieldOfStudy: "Material Science and Engineering",
    notes:
      "Exam Results: 2:1, Dissertation: 1st Class with Distinction\n\nRelevant courses: C Programming, Mathematics and Business for Engineers.",
    schoolName: "Imperial College London",
    startDate: {
      year: 2009
    },
    endDate: {
      year: 2012
    }
  }
];

const skills = [
  {
    name: "Angular"
  },
  {
    name: "TypeScript"
  },
  {
    name: "JavaScript"
  },
  {
    name: "NodeJS"
  }
];

const achievements = [
  {
    issuer: "Oracle",
    name: "Oracle Certified Expert"
  }
];
type CVObjectType = {
  personal_info: any;
  educations: object[];
  work_experiences: object[];
  skills: object[];
  achievements: object[];
  interests: string;
  references: string;
};
let data = {
  personal_info: {
    address: "Address: 58 Elm Avenue, Kent ME4 6ER, UK",
    phone_number: "07035209976",
    profile_url: "https://www.linkedin.com/in/dolan1",
    email: "docx@com",
    headline: "Fullstack Developer",
    full_name: "Dolan Miu"
  },
  educations: education,
  work_experiences: experiences,
  skills,
  achievements,
  interests:
    "Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing.",
  references:
    "Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk"
};
class Styling {
  public createInterests(interests: string): Paragraph {
    const paragraph = new Paragraph();

    paragraph.addRun(new TextRun(interests));
    return paragraph;
  }

  public createHeading(text: string) {
    return new Paragraph(text).heading1().thematicBreak();
  }
  public createSubHeading(text: string): Paragraph {
    return new Paragraph(text).heading2();
  }
  public createInstitutionHeader(
    institutionName: string,
    dateText: string
  ): Paragraph {
    const paragraph = new Paragraph().maxRightTabStop();
    const institution = new TextRun(institutionName).bold();
    const date = new TextRun(dateText).tab().bold();

    paragraph.addRun(institution);
    paragraph.addRun(date);

    return paragraph;
  }
  public createRoleText(roleText: string): Paragraph {
    const paragraph = new Paragraph();
    const role = new TextRun(roleText).italics();

    paragraph.addRun(role);

    return paragraph;
  }
  public createBullet(text: string): Paragraph {
    return new Paragraph(text).bullet();
  }
  // tslint:disable-next-line:no-any
  public createPositionDateText(
    startDate: any,
    endDate: any,
    isCurrent: boolean
  ): string {
    const startDateText =
      this.getMonthFromInt(startDate.month) + ". " + startDate.year;
    const endDateText = isCurrent
      ? "Present"
      : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }
  // tslint:disable-next-line:no-any
  public createSkillList(skills: any[]): Paragraph {
    const paragraph = new Paragraph();
    const skillConcat = skills.map(skill => skill.name).join(", ") + ".";

    paragraph.addRun(new TextRun(skillConcat));

    return paragraph;
  }
  // tslint:disable-next-line:no-any
  public createAchivementsList(achivements: any[]): Paragraph[] {
    const arr: Paragraph[] = [];

    for (const achievement of achivements) {
      const paragraph = new Paragraph(achievement.name).bullet();
      arr.push(paragraph);
    }

    return arr;
  }
  public getMonthFromInt(value: number): string {
    let values = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec"
    ];
    let result = values[value + 1];
    if (Boolean(result)) {
      return result;
    }
    return "N/A";
  }
}

type SectionNode = Document | TableCell;

class DocumentCreator {
  resume: CVObjectType;
  styling: Styling;
  constructor(data: CVObjectType) {
    this.resume = data;
    this.styling = new Styling();
  }
  public createContactInfo({
    address,
    phone_number,
    profile_url,
    email
  }: any): Paragraph {
    const paragraph = new Paragraph().center();
    const contactInfo = new TextRun(
      `Mobile: ${phone_number} | LinkedIn: ${profile_url} | Email: ${email}`
    );

    paragraph.addRun(contactInfo);
    paragraph.addRun(new TextRun(address).break());

    return paragraph;
  }
  createHeaderSection(node: SectionNode, personal_info: any) {
    node.addParagraph(new Paragraph(personal_info.full_name).title());
    node.addParagraph(
      new Paragraph(personal_info.headline).style("headlineStyle")
    );

    node.addParagraph(this.createContactInfo(personal_info));
  }
  createEducationSection(node: SectionNode, educations: any) {
    node.addParagraph(this.styling.createHeading("Education"));
    for (const education of educations) {
      node.addParagraph(
        this.styling.createInstitutionHeader(
          education.schoolName,
          `${education.startDate.year} - ${education.endDate.year}`
        )
      );
      node.addParagraph(
        this.styling.createRoleText(
          `${education.fieldOfStudy} - ${education.degree}`
        )
      );

      const bulletPoints = education.notes.split("\n\n");
      bulletPoints.forEach((bulletPoint: string) => {
        node.addParagraph(this.styling.createBullet(bulletPoint));
      });
    }
  }
  createWorkExperienceSection(node: SectionNode, experiences: any) {
    node.addParagraph(this.styling.createHeading("Experience"));

    for (const position of experiences) {
      node.addParagraph(
        this.styling.createInstitutionHeader(
          position.company.name,
          this.styling.createPositionDateText(
            position.startDate,
            position.endDate,
            position.isCurrent
          )
        )
      );
      node.addParagraph(this.styling.createRoleText(position.title));

      const bulletPoints = position.summary.split("\n\n");

      bulletPoints.forEach((bulletPoint: string) => {
        node.addParagraph(this.styling.createBullet(bulletPoint));
      });
    }
  }
  createSkillSection(node: SectionNode, skills: any) {
    node.addParagraph(this.styling.createSubHeading("Skills"));
    node.addParagraph(this.styling.createSkillList(skills));
  }
  createAchievementSection(node: SectionNode, achivements: any) {
    node.addParagraph(this.styling.createSubHeading("Achievements"));

    for (const achievementParagraph of this.styling.createAchivementsList(
      achivements
    )) {
      node.addParagraph(achievementParagraph);
    }
  }
  createInterestSection(node: SectionNode, interests: any) {
    node.addParagraph(this.styling.createSubHeading("Interests"));

    node.addParagraph(this.styling.createInterests(interests));
  }
  createReferenceSection(node: SectionNode, references: any) {
    node.addParagraph(this.styling.createHeading("References"));

    node.addParagraph(new Paragraph(references));
    node.addParagraph(new Paragraph("More references upon request"));
    node.addParagraph(
      new Paragraph(
        "This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio."
      ).center()
    );
  }
  public create(): Document {
    let data = this.resume;
    // tslint:disable-next-line:no-any
    const experiences = data.work_experiences as any[];
    // tslint:disable-next-line:no-any
    const educations = data.educations as any[];
    const skills = data.skills as object[];
    const achivements = data.achievements as object[];
    const personal_info = data.personal_info as any;
    const document = new Document();
    this.createHeaderSection(document, personal_info);
    this.createEducationSection(document, educations);
    this.createWorkExperienceSection(document, experiences);
    document.addParagraph(
      this.styling.createHeading("Skills, Achievements and Interests")
    );
    this.createSkillSection(document, skills);
    this.createAchievementSection(document, achivements);
    this.createInterestSection(document, data.interests);
    this.createReferenceSection(document, data.references);
    return document;
  }
  public static createDocument(data: CVObjectType): Document {
    let instance = new DocumentCreator(data);
    return instance.create();
  }
}

let doc = DocumentCreator.createDocument(data);
doc.Styles.push(
  new ParagraphStyle("headlineStyle", "Headline Style")
    .basedOn("Heading2")
    .font("Acme")
    .allCaps()
);
doc.Fonts.push(new CustomFont("Acme").addStyle("regular"));
const packer = new Packer();
// doc.addTable(buildTable());
packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("My Document.docx", buffer);
});
