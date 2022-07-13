import { GridProvider, Root, ResponsiveProvider } from '@jenga-ui/core';
import { useRouter, withRouter } from 'next/router';
import '../styles/fonts.css';

const TOKENS = {
  size: 't1',
  font: true,
  fill: '#light',
  '--light-color': 'rgb(243, 243, 251)',
  '--content-padding': ['6x', , , '3x'],
  '--h1-font-size': ['42px', , , '32px'],
  '--h1-line-height': ['54px', , , '44px'],
  '--h2-font-size': ['32px', , , '26px'],
  '--h2-line-height': ['44px', , , '36px'],
  '--h3-font-size': ['26px', , , '22px'],
  '--h3-line-height': ['36px', , , '30px'],
  '--h4-font-size': '18px',
  '--h4-line-height': '30px',
  '--h5-font-size': '16px',
  '--h5-line-height': '26px',
  '--h6-font-size': '14px',
  '--h6-line-height': '26px',
  '--t1-font-size': '18px',
  '--t1-line-height': '30px',
  '--t2-font-size': '16px',
  '--t2-line-height': '26px',
  '--t3-font-size': '14px',
  '--t3-line-height': '24px',
  '--c1-font-size': '16px',
  '--c1-line-height': '22px',
  '--c2-font-size': '14px',
  '--c2-line-height': '22px',
  '--p1-font-size': '18px',
  '--p1-line-height': '32px',
  '--pink-hover-color': 'rgb(250, 50, 110)',
  '--pink-01-color': '#FF6492',
  '--pink-02-color': '#FF83A8',
  '--pink-03-color': '#FFA2BE',
  '--pink-04-color': '#FFC1D3',
  // '--font': 'CeraPro, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
  // '--monospace-font': 'Menlo, Monaco, Consolas, "Courier New", monospace',
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <ResponsiveProvider value={[1600, 980, 640]}>
      <Root
        styles={TOKENS}
        height="min 100vh"
        router={router}
        fonts={false}
        font="CeraPro"
      >
        <GridProvider
          width={['1540px', '(100vw - (2 * @content-padding))']}
          columns={[12, , , 2]}
          gap="3x"
        >
          <Component {...pageProps} />
        </GridProvider>
      </Root>
    </ResponsiveProvider>
  );
}

export default withRouter(MyApp);
