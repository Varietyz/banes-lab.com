// 📊 src/pages/Analytics.jsx
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { metricsToTrack } from '../config/analyticTracking';
import { getColorByGrade, getColorByLoad, getColorByPercent } from '../utils/healthColors';

/**
 *
 */
export default function LabAnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [domainHealth, setDomainHealth] = useState(null);

  const [performanceHistory, setPerformanceHistory] = useState({
    bot_latency: [],
    memory_rss_mb: [],
    heap_used_mb: [],
    cpu_load: [],
    event_loop_lag_ms: [],
    free_mem_mb: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://banes-lab.com:3003/data/analytics/server?t=${Date.now()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();

        if (!json || typeof json !== 'object') throw new Error('Invalid payload');

        setData(json);

        setPerformanceHistory(prev => {
          const updated = { ...prev };
          metricsToTrack.forEach(key => {
            const val = json.performance[key];
            const existing = [...(updated[key] || [])];

            existing.push({ value: val, index: existing.length });
            if (existing.length > 20) existing.shift();

            updated[key] = existing;
          });
          return updated;
        });

        setError(null);
      } catch (err) {
        console.error('❌ Analytics Fetch Error:', err);
        setError('Failed to load analytics.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 12000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDomainHealth = async () => {
      try {
        const res = await fetch(`https://banes-lab.com:3003/data/domain-health?t=${Date.now()}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!json || typeof json !== 'object') throw new Error('Invalid payload');

        setDomainHealth(json);
      } catch (err) {
        console.error('❌ Domain Health Fetch Error:', err);
      }
    };

    fetchDomainHealth();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="px-4 scroll-smooth ">
        <m.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-5xl mx-auto text-white space-y-12 ">
          {/* Header */}
          <m.div className="text-center">
            <h1 className="text-4xl md:text-5xl font-heading text-gold">🔬 Lab Analytics</h1>
            <p className="text-sm text-white/70 mt-2">
              Real-time metrics on performance, and infrastructure.
            </p>
          </m.div>

          {loading ? (
            <m.div className="text-center">
              <p className="text-white/60">Loading analytics data...</p>
            </m.div>
          ) : error ? (
            <m.div className="text-center text-red-400">
              <p>{error}</p>
            </m.div>
          ) : (
            <>
              <Section title="📟 Server Performance">
                <StatCardWithSparkline
                  title="API Req / Min"
                  value={data.performance.api_requests_per_min}
                  color={getColorByLoad(data.performance.api_requests_per_min, {
                    low: 80,
                    high: 300
                  })}
                  metric="api_requests_per_min"
                  performanceHistory={performanceHistory}
                />
                <StatCardWithSparkline
                  title="Memory RSS"
                  value={`${data.performance.memory_rss_mb} MB`}
                  color={getColorByLoad(data.performance.memory_rss_mb, { low: 200, high: 400 })}
                  metric="memory_rss_mb"
                  performanceHistory={performanceHistory}
                />
                <StatCardWithSparkline
                  title="Heap Used"
                  value={`${data.performance.heap_used_mb} MB`}
                  color={getColorByLoad(data.performance.heap_used_mb, { low: 100, high: 300 })}
                  metric="heap_used_mb"
                  performanceHistory={performanceHistory}
                />
                <StatCardWithSparkline
                  title="CPU Load"
                  value={data.performance.cpu_load.toFixed(2)}
                  color={getColorByLoad(data.performance.cpu_load)}
                  metric="cpu_load"
                  performanceHistory={performanceHistory}
                />
                <StatCardWithSparkline
                  title="Event Loop Lag"
                  value={`${data.performance.event_loop_lag_ms}ms`}
                  color={getColorByLoad(data.performance.event_loop_lag_ms, {
                    low: 100,
                    high: 300
                  })}
                  metric="event_loop_lag_ms"
                  performanceHistory={performanceHistory}
                />
                <StatCardWithSparkline
                  title="Free Mem"
                  value={`${data.performance.free_mem_mb} MB`}
                  color={getColorByLoad(data.performance.free_mem_mb * -1, {
                    low: -512,
                    high: -128
                  })}
                  metric="free_mem_mb"
                  performanceHistory={performanceHistory}
                />
                <StatCard title="Total Mem" value={`${data.performance.total_mem_mb} MB`} />
                <StatCard
                  title="Uptime"
                  value={`${Math.floor(data.performance.system_uptime_sec / 3600)}h`}
                />
              </Section>

              {domainHealth && (
                <Section title="🌐 Domain Health (SSL & Site)">
                  <StatCardWithSparkline
                    title="SSL Grade"
                    value={domainHealth.ssl_score}
                    color={getColorByGrade(domainHealth.ssl_score)}
                    metric="ssl_score"
                    performanceHistory={performanceHistory}
                  />
                  <StatCardWithSparkline
                    title="Headers Grade"
                    value={domainHealth.headers_grade}
                    color={getColorByGrade(domainHealth.headers_grade)}
                    metric="headers_grade"
                    performanceHistory={performanceHistory}
                  />
                  <StatCardWithSparkline
                    title="Lighthouse Grade"
                    value={
                      <>
                        {domainHealth.lighthouse_grade}{' '}
                        <span className="text-xs font-code text-white/50">
                          ({domainHealth.lighthouse_score}%)
                        </span>
                      </>
                    }
                    color={getColorByGrade(domainHealth.lighthouse_grade)}
                    metric="lighthouse_score"
                    performanceHistory={performanceHistory}
                  />
                  <StatCard title="TLS Versions" value={domainHealth.tls_versions} />
                  <StatCardWithSparkline
                    title="HSTS Enabled"
                    value={domainHealth.hsts_enabled ? '✅ Yes' : '❌ No'}
                    color={domainHealth.hsts_enabled ? 'text-green-400' : 'text-red-400'}
                    metric="hsts_enabled"
                    performanceHistory={performanceHistory}
                  />
                  <StatCardWithSparkline
                    title="OCSP Stapling"
                    value={domainHealth.ocsp_stapling ? '✅ Yes' : '❌ No'}
                    color={domainHealth.ocsp_stapling ? 'text-green-400' : 'text-red-400'}
                    metric="ocsp_stapling"
                    performanceHistory={performanceHistory}
                  />
                  <StatCardWithSparkline
                    title="PageSpeed"
                    value={`${domainHealth.pagespeed_score}/100`}
                    color={getColorByPercent(domainHealth.pagespeed_score)}
                    metric="pagespeed_score"
                    performanceHistory={performanceHistory}
                  />
                  <StatCard title="Key Alg" value={domainHealth.ssl_key_alg} />
                  <StatCardWithSparkline
                    title="Key Size"
                    value={`${domainHealth.ssl_key_size} bit`}
                    metric="ssl_key_size"
                    performanceHistory={performanceHistory}
                  />
                  <StatCardWithSparkline
                    title="FCP"
                    value={domainHealth.pagespeed_fcp}
                    color={getColorByLoad(parseFloat(domainHealth.pagespeed_fcp), {
                      low: 0.5,
                      high: 1.5
                    })}
                    metric="pagespeed_fcp"
                    performanceHistory={performanceHistory}
                  />
                  <StatCardWithSparkline
                    title="TTI"
                    value={domainHealth.pagespeed_tti}
                    color={getColorByLoad(parseFloat(domainHealth.pagespeed_tti), {
                      low: 1,
                      high: 3
                    })}
                    metric="pagespeed_tti"
                    performanceHistory={performanceHistory}
                  />
                  <StatCardWithSparkline
                    title="Header Coverage"
                    value={`${domainHealth.headers_score}/6`}
                    color={getColorByPercent((domainHealth.headers_score / 6) * 100)}
                    metric="headers_score"
                    performanceHistory={performanceHistory}
                  />
                </Section>
              )}
            </>
          )}
        </m.section>
      </div>
    </LazyMotion>
  );
}

// 🧩 Inject sparklineData when metric is tracked
/**
 *
 * @param root0
 * @param root0.title
 * @param root0.value
 * @param root0.color
 * @param root0.metric
 * @param root0.performanceHistory
 */
function StatCardWithSparkline({ title, value, color, metric, performanceHistory }) {
  const sparklineData = metricsToTrack.includes(metric) ? performanceHistory?.[metric] : null;
  return <StatCard title={title} value={value} color={color} sparklineData={sparklineData} />;
}

/**
 * A stat card with optional animated sparkline background.
 *
 * @param {Object} props
 * @param {string} props.title - Label above the stat.
 * @param {React.ReactNode} props.value - Main stat value (can be string or JSX).
 * @param {string} [props.color='text-gold'] - Tailwind color class for value.
 * @param {Array<{value: number}>} [props.sparklineData] - Optional array for background graph.
 */
function StatCard({ title, value, color = 'text-gold', sparklineData = null }) {
  const hasValue = value !== null && value !== undefined && value !== '';
  const displayValue = hasValue ? value : '—';

  return (
    <div className="relative bg-dark border border-white/10 rounded-xl p-3 shadow-md overflow-hidden">
      {/* 🎵 Sparkline Background */}
      {sparklineData && (
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-0 pointer-events-none h-5 blur-[1px]">
          <ResponsiveContainer width="100%" height="50%">
            <LineChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="index" hide />
              <YAxis hide domain={['auto', 'auto']} />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4eabc494"
                strokeWidth={1}
                dot={false}
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* 🔤 Content */}
      <div className="relative z-10 shadow-sm">
        <div className="text-sm text-white/60 font-body mb-1">{title}</div>
        <div className={`text-xl font-bold tabular-nums ${color}`}>{displayValue}</div>
      </div>
    </div>
  );
}

/**
 *
 * @param root0
 * @param root0.title
 * @param root0.children
 */
function Section({ title, children }) {
  return (
    <m.div>
      <h2 className=" bg-dark rounded-lg border-b py-1 border-gold text-xl text-center font-bold text-gold text-shadow-lg mb-3">
        {title}
      </h2>
      <div className="grid text-center  grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {children}
      </div>
    </m.div>
  );
}
