import Link from 'next/link';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-600 text-gray-800 p-6">
      <Link href="./workspace">
        <h1 className="text-blue-700 hover:text-blue-900 text-lg font-semibold cursor-pointer">
          &larr; Back to Workspace
        </h1>
      </Link>
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">About Us</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4"> Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At WorkSpace, it strive to streamline work assignments and enhance productivity within your organization.
             Mission is to provide a seamless and secure platform where managers can efficiently assign tasks, and employees
            can easily access and complete their work.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Do</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our platform is designed to cater to the needs of both managers and employees through a user-friendly interface and robust
            backend systems. Here’s how we help different roles within your organization:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Managers</strong>: With our intuitive work assignment features, managers can effortlessly delegate tasks, track progress, and ensure that the right work gets to the right people.</li>
            <li><strong>Employees</strong>: Employees can log in to view their assigned tasks and communicate effectively with their managers, all from a single, cohesive platform.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Role-Based Access Control</strong>: Powered by permit.io/opal, our platform ensures that users have access to features and information according to their role level. This means managers have the tools they need to assign and track work, while employees have a focused view of their tasks.</li>
            <li><strong>Secure and Reliable</strong>: Built with Node.js on the frontend and MongoDB as our backend database, our system is both robust and scalable. We prioritize security and reliability to ensure your data is always protected.</li>
            <li><strong>User-Friendly Interface</strong>: Our platform is designed with simplicity and ease of use in mind, making it accessible for all users, regardless of technical expertise.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Technology</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We leverage the latest technologies to deliver a powerful and efficient platform:
          </p>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li><strong>Node.js</strong>: Our frontend is built using Node.js, providing a fast, responsive, and scalable user experience.</li>
            <li><strong>MongoDB</strong>: Our backend database is powered by MongoDB, ensuring that we can handle large volumes of data with ease and reliability.</li>
            <li><strong>opal</strong>: For authentication and role-based access control, we utilize opal, ensuring that users have the appropriate permissions and access to the features they need.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We’d love to hear from you! If you have any questions, feedback, or need support, please don't hesitate to reach out to us. This is a demo site, made for educational purposes only.
          </p>
          <ul className="list-none text-gray-700 space-y-2">
            <li><strong>Email</strong>: aryancollegexyz@gmail.com</li>
            <li><strong>LinkedIn</strong>: https://www.linkedin.com/in/aryan-sharma-345940265/</li>
          </ul>
        </section>

        <p className="text-center text-gray-700 mt-8">
          Thank you for choosing WorkSpace. We are excited to be a part of your journey towards greater productivity and collaboration!
        </p>
      </div>
    </div>
  );
}