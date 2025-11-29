<template>
  <div>
    <div class="status-page">
      <div class="header">
        <div class="status-title">
          <h1>Status page</h1>
          <UptimeIndicator status="operational" />
        </div>
        <div class="status-info">
          <h1 class="tiny-font">99.99%</h1>
          <p>overall uptime</p>
        </div>
      </div>
      <div class="statuses">
        
        <div class="status-group">
          <h2>Group Header</h2>
          
          <div class="status-box">
            <div class="header">
              <div class="title">
                <span>Server 1</span> <span class="tiny-font server-uptime-info">99.9% uptime</span>
              </div>
              <div class="status">
                <UptimeIndicator />
              </div>
            </div>
            <div class="status-monitors">
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor partially-out" />
              <div class="monitor partially-out" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor partially-out" />
              <div class="monitor partially-out" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor partially-out" />
              <div class="monitor partially-out" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
            </div>
          </div>

          <div class="status-box">
            <div class="header">
              <div class="title">
                <span>Server 2</span> <span class="tiny-font server-uptime-info">99.9% uptime</span>
              </div>
              <div class="status">
                <UptimeIndicator />
              </div>
            </div>
            <div class="status-monitors">
              <div class="monitor completely-out" />
              <div class="monitor completely-out" />
              <div class="monitor completely-out" />
              <div class="monitor completely-out" />
              <div class="monitor partially-out" />
              <div class="monitor partially-out" />
              <div class="monitor completely-out" />
              <div class="monitor completely-out" />
              <div class="monitor completely-out" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor completely-out" />
              <div class="monitor completely-out" />
              <div class="monitor completely-out" />
              <div class="monitor completely-out" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor partially-out" />
              <div class="monitor partially-out" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor partially-out" />
              <div class="monitor partially-out" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
              <div class="monitor operational" />
            </div>
          </div>

        </div>
      </div>

      <!-- footer -->
      <div class="footer">
        <div><span>powered by <a href="https://github.com/LMNYX/miyuki">miyuki</a> v{{ versionData?.version }}</span></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const {data: versionData} = await useFetch('/api/version');

console.log(versionData);

useHead({
  title: "status"
});

</script>
