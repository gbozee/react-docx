import React from "react";
import warning from "./utils/warning";
import { document } from "./index";

const flatStyles = (stylesArray: {
  reduce: (arg0: (acc: any, style: any) => any, arg1: {}) => void;
}) => stylesArray.reduce((acc, style) => ({ ...acc, ...style }), {});

type InternalBlobProviderType = {
  [key: string]: any;
  children: (state: any) => {};
};
type InternalBlobProviderStateType = {
  blob?: any;
  url?: string;
  loading: boolean;
  error?: any;
};
class InternalBlobProvider extends React.PureComponent<
  InternalBlobProviderType,
  InternalBlobProviderStateType
> {
  state = { blob: null, url: "", loading: true, error: null };
  instance: any;

  constructor(props: Readonly<InternalBlobProviderType>) {
    super(props);

    // Create new root container for this render
    this.instance = document(undefined);
  }

  componentDidMount() {
    this.renderDocument();
    this.onDocumentUpdate();
  }

  componentDidUpdate() {
    this.renderDocument();

    if (this.instance.isDirty() && !this.state.error) {
      this.onDocumentUpdate();
    }
  }

  renderDocument() {
    this.instance.updateContainer(this.props.document);
  }

  onDocumentUpdate() {
    const oldBlobUrl = this.state.url;

    this.instance
      .toBlob()
      .then((blob: any) => {
        this.setState(
          { blob, url: URL.createObjectURL(blob), loading: false },
          () => URL.revokeObjectURL(oldBlobUrl)
        );
      })
      .catch((error: any) => {
        this.setState({ error });
        console.error(error);
        throw error;
      });
  }

  render() {
    return this.props.children(this.state);
  }
}

export const BlobProvider = ({ doc, children }: any) => {
  if (!doc) {
    warning(false, "You should pass a valid document to BlobProvider");
    return null;
  }

  return <InternalBlobProvider document={doc}>{children}</InternalBlobProvider>;
};

export const DOCXViewer = ({
  className,
  style,
  children,
  innerRef,
  ...props
}: any) => {
  return (
    <InternalBlobProvider document={children}>
      {({ url }) => (
        <iframe
          className={className}
          ref={innerRef}
          src={url}
          style={Array.isArray(style) ? flatStyles(style) : style}
          {...props}
        />
      )}
    </InternalBlobProvider>
  );
};

export const DOCXDownloadLink = ({
  document: doc,
  className,
  style,
  children,
  fileName = "document.docx"
}: any) => {
  if (!doc) {
    warning(false, "You should pass a valid document to DOCXDownloadLink");
    return null;
  }

  const downloadOnIE = (blob: any) => () => {
    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName);
    }
  };

  return (
    <InternalBlobProvider document={doc}>
      {params => (
        <a
          className={className}
          download={fileName}
          href={params.url}
          onClick={downloadOnIE(params.blob)}
          style={Array.isArray(style) ? flatStyles(style) : style}
        >
          {typeof children === "function" ? children(params) : children}
        </a>
      )}
    </InternalBlobProvider>
  );
};

export {
  document,
  View,
  Text,
  Link,
  Page,
  // Font,
  Note,
  Image,
  Canvas,
  version,
  // StyleSheet,
  Document,
  DocRenderer,
  createInstance
} from "./index";
