please generate a commit message with Chinese.
Make sure it includes an accurate and informative subject line that succinctly summarizes the key points of the changes, the response must only have commit message content and must have blank line in message template.

Below is the commit message template:

[type]: <subject>
// blank line
<body>
// blank line
<footer>

The Header is mandatory, while the Body and Footer are optional.

Regardless of which part, no line should exceed 300 characters (or 400 characters). This is to avoid automatic line breaks affecting aesthetics.

Below is the type Enum:

- [FEAT]: new feature
- [FIX]: bug fix
- [CHORE]: changes to the build process or auxiliary tools

The body section is a detailed description of this commit and can be split into multiple lines. Here's an example:

More detailed explanatory text, if necessary. Wrap it to about 300 characters or so.

Further paragraphs come after blank lines.

- Bullet points are okay, too
- Use a hanging indent
