import path from 'path'
//
import React from 'react'
import axios from 'axios'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'

export default {
  getSiteData: () => ({
    title: 'React Static',
  }),
  getRoutes: async () => {
    return [
      {
        path: '/',
        component: 'src/containers/home',
      },
      {
        path: '/how-it-works/',
        component: 'src/containers/how_it_works',
      },
      {
        path: '/faq/',
        component: 'src/v1.1/pages/FAQs',
      },
      {
        path: '/safecoin/',
        component: 'src/containers/safecoins',
      },
      {
        path: '/get-involved/',
        component: 'src/v1.1/pages/GetInvolved',
      },
      {
        path: '/timeline/',
        component: 'src/containers/timeline',
      },
      {
        path: '/press-kit/',
        component: 'src/v1.1/pages/PressKit',
      },
      {
        path: '/cookies/',
        component: 'src/containers/cookies',
      },
      {
        path: '/privacy/',
        component: 'src/containers/privacy',
      },
      {
        path: '/about-maidsafe/',
        component: 'src/containers/about-maidsafe',
      },
      {
        path: '/fundamentals/',
        component: 'src/containers/fundamentals'
      },
      {
        is404: true,
        component: 'src/containers/404',
      },
    ]
  },
  webpack: (config, { defaultLoaders, stage }) => {
    let loaders = []

    if (stage === 'dev') {
      loaders = [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
    } else {
      loaders = [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            minimize: stage === 'prod',
            sourceMap: false,
          },
        },
        {
          loader: 'sass-loader',
          options: { includePaths: ['src/'] },
        },
      ]

      // Don't extract css to file during node build process
      if (stage !== 'node') {
        loaders = ExtractTextPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              sourceMap: false,
              hmr: false,
            },
          },
          use: loaders,
        })
      }
    }

    config.module.rules = [
      {
        oneOf: [
          {
            test: /\.s(a|c)ss$/,
            use: loaders,
          },
          defaultLoaders.cssLoader,
          defaultLoaders.jsLoader,
          defaultLoaders.fileLoader,
        ],
      },
    ]

    config.plugins.push(new CompressionPlugin({
      algorithm: 'gzip'
    }))
    //
    config.resolve = {
      ...config.resolve,
      alias: {
        styles: path.resolve(__dirname, 'src/v1.1/styles'),
        images: path.resolve(__dirname, 'src/assets/images'),
        fonts: path.resolve(__dirname, 'src/assets/fonts'),
        components: path.resolve(__dirname, 'src/v1.1/components'),
        src: path.resolve(__dirname, 'src')
      }
    }
    return config
  },
  Document: ({ Html, Head, Body, children, siteData, renderMeta }) => (
    <Html lang="en-US">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#444444" />
        <link rel="shortcut icon" type="image/icon" href="/favicon.ico" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <title>SAFE Network</title>
      </Head>
      <Body className="no-js">{children}</Body>
    </Html>
  ),
}
