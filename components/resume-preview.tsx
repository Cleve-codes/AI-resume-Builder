export default function ResumePreview() {
  return (
    <div className="max-w-[800px] mx-auto bg-white p-8 shadow-sm border">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold mb-1">John Doe</h1>
        <div className="text-sm text-muted-foreground">
          <span>San Francisco, CA</span> •<span className="mx-2">john.doe@example.com</span> •
          <span>(555) 123-4567</span> •<span className="mx-2">linkedin.com/in/johndoe</span>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-2">Professional Summary</h2>
        <p className="text-sm">
          Experienced software engineer with 5+ years of experience in full-stack development. Proficient in React,
          Node.js, and cloud technologies. Passionate about building scalable and user-friendly applications.
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3">Work Experience</h2>

        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <div>
              <span className="font-medium">Senior Software Engineer</span> •
              <span className="ml-1">Tech Solutions Inc.</span>
            </div>
            <div className="text-sm text-muted-foreground">Jan 2021 - Present</div>
          </div>
          <div className="text-sm mb-2">San Francisco, CA</div>
          <p className="text-sm">
            Led development of a customer-facing web application using React and Node.js. Improved application
            performance by 40% through code optimization and implementing efficient data structures.
          </p>
        </div>

        <div>
          <div className="flex justify-between mb-1">
            <div>
              <span className="font-medium">Software Engineer</span> •<span className="ml-1">Digital Innovations</span>
            </div>
            <div className="text-sm text-muted-foreground">Jun 2018 - Dec 2020</div>
          </div>
          <div className="text-sm mb-2">San Jose, CA</div>
          <p className="text-sm">
            Developed and maintained RESTful APIs using Node.js and Express. Collaborated with cross-functional teams to
            implement new features and resolve bugs.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold border-b pb-1 mb-3">Education</h2>
        <div>
          <div className="flex justify-between mb-1">
            <div>
              <span className="font-medium">Bachelor of Science in Computer Science</span> •
              <span className="ml-1">University of California, Berkeley</span>
            </div>
            <div className="text-sm text-muted-foreground">2014 - 2018</div>
          </div>
          <div className="text-sm">GPA: 3.8/4.0</div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold border-b pb-1 mb-3">Skills</h2>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Programming Languages:</span> JavaScript, TypeScript, Python, Java
          </div>
          <div>
            <span className="font-medium">Frontend:</span> React, Redux, HTML5, CSS3, Tailwind CSS
          </div>
          <div>
            <span className="font-medium">Backend:</span> Node.js, Express, REST APIs, GraphQL
          </div>
          <div>
            <span className="font-medium">Databases:</span> MongoDB, PostgreSQL, MySQL
          </div>
          <div>
            <span className="font-medium">Cloud:</span> AWS, Google Cloud, Docker, Kubernetes
          </div>
          <div>
            <span className="font-medium">Tools:</span> Git, JIRA, CI/CD, Jest, Cypress
          </div>
        </div>
      </div>
    </div>
  )
}

