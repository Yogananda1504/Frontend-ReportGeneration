import React from 'react';

function QuickHelp() {
  const quickPpt = '../../../assets/ppt.pptx';
  const pptUrl = window.location.origin + quickPpt;
  const embedUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(pptUrl)}`;

  return (
    <div>
      <h1>Quick Help</h1>
      <p>Here you can find quick help resources.</p>
      <iframe
        title="PowerPoint Presentation"
        src={embedUrl}
        width="100%"
        height="600px"
        frameBorder="0"
      />
    </div>
  );
}

export default QuickHelp;
