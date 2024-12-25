 // Toggle theme function
 function toggleTheme() {
    document.body.classList.toggle('dark');
  }

  // Detect Device Type (Phone, Tablet, or PC)
  function detectDeviceType() {
    const parser = new UAParser();
    const result = parser.getResult();
    const deviceType = result.device.type || 'PC';
    return deviceType.charAt(0).toUpperCase() + deviceType.slice(1);
  }

  // Display Device Type
  const deviceType = detectDeviceType();
  document.getElementById('deviceTypeInfo').textContent = deviceType;

  // Show UA Parser details
  const parser = new UAParser();
  const result = parser.getResult();
  const uaDetails = document.getElementById('uaDetails');
  uaDetails.innerHTML = ` 
    <p><strong>Browser:</strong> ${result.browser.name} ${result.browser.version}</p>
    <p><strong>OS:</strong> ${result.os.name} ${result.os.version}</p>
    <p><strong>Device:</strong> ${result.device.vendor || 'Unknown'} ${result.device.model || 'Unknown'}</p>
    <p><strong>CPU:</strong> ${result.cpu.architecture || 'Unknown'}</p>
  `;

  // Show Device Specific Information
  function showDeviceSpecificInfo(deviceType) {
    if (deviceType === 'Mobile' || deviceType === 'Tablet') {
      if ('getBattery' in navigator) {
        navigator.getBattery().then(function(battery) {
          document.getElementById('batteryInfo').style.display = 'block';
          document.getElementById('batteryLevel').textContent = 'Battery Level: ' + (battery.level * 100).toFixed(2) + '%';
          document.getElementById('chargingStatus').textContent = 'Charging Status: ' + (battery.charging ? 'Charging' : 'Not charging');
          document.getElementById('chargingTime').textContent = 'Charging Time: ' + (battery.chargingTime === Infinity ? 'N/A' : battery.chargingTime + ' seconds');
          document.getElementById('dischargingTime').textContent = 'Discharging Time: ' + (battery.dischargingTime === Infinity ? 'N/A' : battery.dischargingTime + ' seconds');
        });
      }

      navigator.geolocation.getCurrentPosition(function(position) {
        document.getElementById('geolocationInfo').style.display = 'block';
        document.getElementById('latitude').textContent = 'Latitude: ' + position.coords.latitude.toFixed(6);
        document.getElementById('longitude').textContent = 'Longitude: ' + position.coords.longitude.toFixed(6);
        document.getElementById('accuracy').textContent = 'Accuracy: ' + position.coords.accuracy.toFixed(2) + ' meters';
      });

      window.addEventListener("deviceorientation", function(event) {
        document.getElementById('deviceOrientationInfo').style.display = 'block';
        document.getElementById('alpha').textContent = 'Alpha: ' + (event.alpha ? event.alpha.toFixed(2) : 'N/A');
        document.getElementById('beta').textContent = 'Beta: ' + (event.beta ? event.beta.toFixed(2) : 'N/A');
        document.getElementById('gamma').textContent = 'Gamma: ' + (event.gamma ? event.gamma.toFixed(2) : 'N/A');
      });
    } else {
      document.getElementById('batteryInfo').style.display = 'none';
      document.getElementById('geolocationInfo').style.display = 'none';
      document.getElementById('deviceOrientationInfo').style.display = 'none';
    }
  }

  showDeviceSpecificInfo(deviceType);

  // Display User Agent info
  document.getElementById('userAgent').textContent = navigator.userAgent;

  // Display Network Information
  if ('connection' in navigator) {
    document.getElementById('networkInfo').style.display = 'block';
    document.getElementById('networkType').textContent = 'Connection Type: ' + navigator.connection.effectiveType;
    document.getElementById('downlink').textContent = 'Downlink Speed: ' + navigator.connection.downlink + ' Mbps';
    document.getElementById('rtt').textContent = 'RTT: ' + navigator.connection.rtt + ' ms';
    document.getElementById('saveData').textContent = 'Save Data: ' + (navigator.connection.saveData ? 'Enabled' : 'Disabled');
  } else {
    document.getElementById('networkInfo').style.display = 'none';
  }

  // Display Screen Information
  document.getElementById('screenWidth').textContent = 'Screen Width: ' + window.screen.width;
  document.getElementById('screenHeight').textContent = 'Screen Height: ' + window.screen.height;
  document.getElementById('devicePixelRatio').textContent = 'Device Pixel Ratio: ' + window.devicePixelRatio;

  // Display Device Memory
  if ('deviceMemory' in navigator) {
    document.getElementById('deviceMemoryInfo').style.display = 'block';
    document.getElementById('deviceMemory').textContent = 'Device Memory: ' + navigator.deviceMemory + ' GB';
  } else {
    document.getElementById('deviceMemoryInfo').style.display = 'none';
  }

  // Display Hardware Concurrency (CPU Cores)
  if ('hardwareConcurrency' in navigator) {
    document.getElementById('hardwareConcurrencyInfo').style.display = 'block';
    document.getElementById('cpuCores').textContent = 'CPU Cores: ' + navigator.hardwareConcurrency;
  } else {
    document.getElementById('hardwareConcurrencyInfo').style.display = 'none';
  }

  // Display Timezone
  document.getElementById('timezone').textContent = 'Timezone: ' + Intl.DateTimeFormat().resolvedOptions().timeZone;
  document.getElementById('timezoneOffset').textContent = 'Timezone Offset: ' + new Date().getTimezoneOffset() + ' minutes';

  // Display Language
  document.getElementById('language').textContent = 'Language: ' + navigator.language;
