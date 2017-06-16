export default (pluginContext) => {
  const {
    React,
  } = pluginContext.lib;

  const {
    Panel,
    Row,
  } = pluginContext.layoutComponents;

  const {
    Field,
    InputTable,
  } = pluginContext.recordComponents;

  return (
    <Field name="document">

      <Panel name="info" collapsible>
        { /* TODO Add columns component */ }
        <Row>
          <Field name="acquisitionReferenceNumber" />
          <Field name="accessionDateGroup" />
        </Row>

        <Row>
          <Field name="acquisitionDateGroupList">
            <Field name="acquisitionDateGroup" />
          </Field>
          <Field name="acquisitionMethod" />
        </Row>

        <Row>
          <InputTable name="acquisitionAuthorizer">
            <Field name="acquisitionAuthorizer" />
            <Field name="acquisitionAuthorizerDate" />
          </InputTable>
        </Row>

        <Row>
          <Field name="acquisitionSources">
            <Field name="acquisitionSource" />
          </Field>
          <Field name="owners">
            <Field name="owner" />
          </Field>
        </Row>

        <Row>
          <Field name="transferOfTitleNumber" />
          <Field name="acquisitionReason" />
        </Row>

        <Row>
          <Field name="acquisitionNote" />
          <Field name="acquisitionProvisos" />
        </Row>

        {/* TODO Build out Price information table*/}
        <Row>
          <InputTable name="priceInformation">
            <Field name="groupPurchasePriceCurrency" />
            <Field name="groupPurchasePriceValue" />
            <Field name="objectOfferPriceCurrency" />
            <Field name="objectOfferPriceValue" />
            <Field name="objectPurchaseOfferPriceCurrency" />
            <Field name="objectPurchaseOfferPriceValue" />
            <Field name="objectPurchasePriceCurrency" />
            <Field name="objectPurchasePriceValue" />
            <Field name="originalObjectPurchasePriceCurrency" />
            <Field name="originalObjectPurchasePriceValue" />
          </InputTable>
        </Row>

        <Row>
          <Field name="acquisitionFundingList">
            <Field name="acquisitionFunding">
              <Field name="acquisitionFundingCurrency" />
              <Field name="acquisitionFundingValue" />
              <Field name="acquisitionFundingSource" />
              <Field name="acquisitionFundingSourceProvisos" />
            </Field>
          </Field>
        </Row>

        <Row>
          <Field name="creditLine" />
        </Row>

      </Panel>

      <Panel name="objectCollectionInformation" collapsible>

        <Row>
          <Field name="fieldCollectionEventNames">
            <Field name="fieldCollectionEventName" />
          </Field>
        </Row>

      </Panel>

    </Field>
  );
};
