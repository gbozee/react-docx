import React from "react";
import { Document, Section, Text, render, List } from "@gbozee/react-docx";
// import { render } from "./react-docx/node";

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
// type CVObjectType = {
//   personal_info: any;
//   educations: object[];
//   work_experiences: object[];
//   skills: object[];
//   achievements: object[];
//   interests: string;
//   references: string;
// };
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
const ContactInfo = ({
  full_name,
  headline,
  phone_number,
  profile_url,
  address,
  email
}: any) => {
  return (
    <>
      <Section style={{ heading: "title" }}>{full_name}</Section>
      <Section className="headlineStyle">{headline}</Section>
      <Section style={{ center: true }}>
        <Text>{`Mobile: ${phone_number} | LinkedIn: ${profile_url} | Email: ${email}`}</Text>
        <Text>
          {address}
          <br />
        </Text>
      </Section>
    </>
  );
};
const Heading = ({ children }: any) => {
  return (
    <Section style={{ heading: "heading1" }}>
      {children} <hr />
    </Section>
  );
};
const SubHeader = ({ children }: any) => {
  return (
    <Section style={{ justifyContent: "space-between" }}>{children}</Section>
  );
};
const EducationSection = ({ educations }: any) => {
  return (
    <>
      <Heading>Education</Heading>
      <Section>
        {educations.map((education: any, index: number) => {
          let bulletPoints = education.notes.split("\n\n");
          return (
            <React.Fragment key={index}>
              <SubHeader>
                <Text style={{ bold: true }}>{education.schoolName}</Text>
                <Text style={{ bold: true }}>{`${education.startDate.year} - ${
                  education.endDate.year
                }`}</Text>
              </SubHeader>
              <Section>
                <Text style={{ italics: true }}>{`${education.fieldOfStudy} - ${
                  education.degree
                }`}</Text>
              </Section>
              <List>
                {bulletPoints.map((bullet: any, index: number) => (
                  <Text key={index}>{bullet}</Text>
                ))}
              </List>
            </React.Fragment>
          );
        })}
      </Section>
    </>
  );
};
function getMonthFromInt(value: number): string {
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
const WorkExperienceSection = ({ experiences }: any) => {
  function createPositionDateText(
    startDate: any,
    endDate: any,
    isCurrent: boolean
  ): string {
    const startDateText =
      getMonthFromInt(startDate.month) + ". " + startDate.year;
    const endDateText = isCurrent
      ? "Present"
      : `${getMonthFromInt(endDate.month)}. ${endDate.year}`;

    return `${startDateText} - ${endDateText}`;
  }
  return (
    <>
      <Heading>Experience</Heading>
      {experiences.map((position: any, index: number) => {
        const bulletPoints = position.summary.split("\n\n");
        return (
          <React.Fragment key={index}>
            <SubHeader>
              <Text style={{ bold: true }}>{position.company.name}</Text>
              <Text style={{ bold: true }}>
                {createPositionDateText(
                  position.startDate,
                  position.endDate,
                  position.isCurrent
                )}
              </Text>
            </SubHeader>
            <Section>
              <Text style={{ italics: true }}>{position.title}</Text>
            </Section>
            <List>
              {bulletPoints.map((bullet: any, index: number) => (
                <Text key={index}>{bullet}</Text>
              ))}
            </List>
          </React.Fragment>
        );
      })}
    </>
  );
};
const SkillSection = ({ skills, achievements, interests }: any) => {
  const skillConcat =
    skills.map((skill: { name: string }) => skill.name).join(", ") + ".";

  return (
    <>
      <Heading>Skills, Achievments and Interests</Heading>
      <Section style={{ heading2: true }}>Skills</Section>
      <Section>
        <Text>{skillConcat}</Text>
      </Section>
      <Section style={{ heading2: true }}>Achievements</Section>
      {achievements.map((achievement: any, key: number) => {
        return (
          <List key={key}>
            <Text>{achievement.name}</Text>
          </List>
        );
      })}
      <Section style={{ heading2: true }}>Interests</Section>
      <Section>
        <Text>{interests}</Text>
      </Section>
    </>
  );
};
const ReferenceSection = ({ references }: any) => {
  return (
    <>
      <Heading>References</Heading>
      <Section>{references}</Section>
      <Section>More references upon request</Section>
      <Section style={{ center: true }}>
        "This CV was generated in real-time based on my Linked-In profile from
        my personal website www.dolan.bio."
      </Section>
    </>
  );
};
const doc = (
  <Document
    fonts={{ Acme: ["regular"] }}
    rootStyle={{
      headlineStyle: {
        name: "Headline Style",
        style: {
          basedOn: "Heading2",
          font: "Acme",
          allCaps: true
        }
      }
    }}
  >
    <ContactInfo {...data.personal_info} />
    <EducationSection educations={data.educations} />
    <WorkExperienceSection experiences={data.work_experiences} />
    <SkillSection
      skills={data.skills}
      achievements={data.achievements}
      interests={data.interests}
    />
    <ReferenceSection references={data.references} />
  </Document>
);

render(doc, "sample.docx", (output: any, filepath: any) => {
  console.log(output);
  console.log(filepath);
});
