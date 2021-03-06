/* global window, Blob */

import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { createRenderer } from 'react-test-renderer/shallow';
import ContentViewerPage from '../../../../src/components/pages/ContentViewerPage';
import createTestContainer from '../../../helpers/createTestContainer';

const expect = chai.expect;

chai.should();

describe('ContentViewerPage', function suite() {
  const readContent = () => Promise.resolve({
    status: 200,
    data: new Blob(),
  });

  beforeEach(function before() {
    this.container = createTestContainer(this);
  });

  it('should render nothing when mounted, then an iframe once the content has been read', function test() {
    const match = {
      params: {
        contentPath: 'blobs/1234/content',
      },
    };

    render(
      <ContentViewerPage
        match={match}
        readContent={readContent}
      />, this.container);

    expect(this.container.firstElementChild).to.equal(null);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const iframe = this.container.firstElementChild;

        iframe.nodeName.should.equal('IFRAME');
        iframe.src.should.match(/^blob:/);

        resolve();
      }, 0);
    });
  });

  it('should render nothing if imagePath is not present in match params', function test() {
    const match = {};

    const shallowRenderer = createRenderer();

    shallowRenderer.render(<ContentViewerPage match={match} readContent={readContent} />);

    const result = shallowRenderer.getRenderOutput();

    expect(result).to.equal(null);
  });

  it('should clear previous content when the content path changes', function test() {
    const match = {
      params: {
        contentPath: 'blobs/1234/content',
      },
    };

    render(
      <ContentViewerPage
        match={match}
        readContent={readContent}
      />, this.container);

    expect(this.container.firstElementChild).to.equal(null);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const iframe = this.container.firstElementChild;

        iframe.nodeName.should.equal('IFRAME');
        iframe.src.should.match(/^blob:/);

        const newMatch = {
          params: {
            contentPath: 'blobs/5678/content',
          },
        };

        render(
          <ContentViewerPage
            match={newMatch}
            readContent={readContent}
          />, this.container);

        expect(this.container.firstElementChild).to.equal(null);

        resolve();
      }, 0);
    });
  });

  it('should render nothing if unmounted before the content is read', function test() {
    const match = {
      params: {
        contentPath: 'blobs/1234/content',
      },
    };

    render(
      <ContentViewerPage
        match={match}
        readContent={readContent}
      />, this.container);

    expect(this.container.firstElementChild).to.equal(null);

    unmountComponentAtNode(this.container);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        expect(this.container.firstElementChild).to.equal(null);

        resolve();
      }, 0);
    });
  });

  it('should call renderError to render an error when reading the content fails', function test() {
    const failingReadContent = () => Promise.reject({});

    const renderError = () => <div>renderError called</div>;

    const match = {
      params: {
        contentPath: 'blobs/1234/content',
      },
    };

    render(
      <ContentViewerPage
        match={match}
        readContent={failingReadContent}
        renderError={renderError}
      />, this.container);

    return new Promise((resolve) => {
      window.setTimeout(() => {
        const div = this.container.firstElementChild;

        div.nodeName.should.equal('DIV');
        div.textContent.should.equal('renderError called');

        resolve();
      }, 0);
    });
  });
});
