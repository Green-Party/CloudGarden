import React from "react";

const About: React.FC<{ title: string }> = ({ title }) => (
  <h1>This is for the {title} sensor info</h1>
);

export default About;
