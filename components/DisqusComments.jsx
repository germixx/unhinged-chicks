import { useEffect } from "react";

const DisqusComments = ({ shortname, url, identifier }) => {
  useEffect(() => {
    if (window.DISQUS) {
      window.DISQUS.reset({
        reload: true,
        config: function () {
          this.page.url = url;
          this.page.identifier = identifier;
        },
      });
    } else {
      const d = document, s = d.createElement("script");
      s.src = `https://${shortname}.disqus.com/embed.js`;
      s.setAttribute("data-timestamp", +new Date());
      (d.head || d.body).appendChild(s);
    }
  }, [shortname, url, identifier]);

  return (
    <div>
      <div id="disqus_thread"></div>
      <noscript>
        Please enable JavaScript to view the{" "}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
    </div>
  );
};

export default DisqusComments;