import assert from "node:assert/strict";
import { parseMoiPage } from "./sync-officeholders.mjs";

const html = `<!doctype html><html><body>
<div>資料查詢</div>
<div class="card">
  <img alt="莊 欽億" src="/images/a.jpg">
  <span>莊欽億</span><span>臺北市</span>
  <span>臺北市中山區大佳里 里長</span>
  <span>民主進步黨</span><a>詳細資訊</a>
</div>
<div class="card">
  <img alt="鄧 麗珠" src="/images/b.jpg">
  <span>鄧麗珠</span><span>臺北市</span>
  <span>臺北市中山區新庄里 里長</span>
  <span>無</span><a>詳細資訊</a>
</div>
<div class="card">
  <img alt="羅 仲瑜" src="/images/c.jpg">
  <span>羅仲瑜</span><span>臺北市</span>
  <span>臺北市中山區行政里 代理里長</span>
  <span>無</span><a>詳細資訊</a>
</div>
<div>每頁筆數 10 16 20 50 100 200</div><div>/7730</div>
<div>您目前未啟用 JavaScript</div>
</body></html>`;

const source = { roleId: "village-chief", name: "村里長" };
const parsed = parseMoiPage(html, source, "https://www.moi.gov.tw/LocalOfficial.aspx?PageSize=200&TYP=KND0007&n=577&page=1&sms=11395");
assert.equal(parsed.items.length, 3);
assert.equal(parsed.items[0].name, "莊欽億");
assert.equal(parsed.items[0].countyId, "taipei");
assert.equal(parsed.items[0].partyId, "dpp");
assert.equal(parsed.items[1].partyId, "ind");
assert.equal(parsed.items[2].title, "代理里長");
assert.equal(parsed.totalPages, 39);
assert.equal(parsed.diagnostics.roleLineCount, 3);
console.log("MOI parser fixture passed:", parsed.items.length, "items;", parsed.totalPages, "pages");
