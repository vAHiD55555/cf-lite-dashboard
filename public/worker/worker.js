export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const cfApi = "https://api.cloudflare.com/client/v4";
    const headers = {
      "Authorization": `Bearer ${env.CF_TOKEN}`,
      "Content-Type": "application/json"
    };

    if (path === "/zones") {
      const res = await fetch(`${cfApi}/zones`, { headers });
      return new Response(await res.text(), { headers: { "Content-Type": "application/json" } });
    }

    if (path.startsWith("/dns")) {
      const zone = url.searchParams.get("zone");
      const res = await fetch(
        `${cfApi}/zones/${zone}/dns_records`,
        { headers }
      );
      return new Response(await res.text(), { headers: { "Content-Type": "application/json" } });
    }

    if (path === "/purge") {
      const { zone } = await request.json();
      const res = await fetch(
        `${cfApi}/zones/${zone}/purge_cache`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ purge_everything: true })
        }
      );
      return new Response(await res.text(), { headers: { "Content-Type": "application/json" } });
    }

    return new Response("OK");
  }
};
