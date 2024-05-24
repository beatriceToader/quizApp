/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getQuestionModel } from "../graphql/queries";
import { updateQuestionModel } from "../graphql/mutations";
const client = generateClient();
export default function QuestionModelUpdateForm(props) {
  const {
    id: idProp,
    questionModel: questionModelModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    text: "",
    a: "",
    b: "",
    c: "",
    d: "",
    e: "",
    reversed: false,
    number: "",
  };
  const [text, setText] = React.useState(initialValues.text);
  const [a, setA] = React.useState(initialValues.a);
  const [b, setB] = React.useState(initialValues.b);
  const [c, setC] = React.useState(initialValues.c);
  const [d, setD] = React.useState(initialValues.d);
  const [e, setE] = React.useState(initialValues.e);
  const [reversed, setReversed] = React.useState(initialValues.reversed);
  const [number, setNumber] = React.useState(initialValues.number);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = questionModelRecord
      ? { ...initialValues, ...questionModelRecord }
      : initialValues;
    setText(cleanValues.text);
    setA(cleanValues.a);
    setB(cleanValues.b);
    setC(cleanValues.c);
    setD(cleanValues.d);
    setE(cleanValues.e);
    setReversed(cleanValues.reversed);
    setNumber(cleanValues.number);
    setErrors({});
  };
  const [questionModelRecord, setQuestionModelRecord] = React.useState(
    questionModelModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getQuestionModel.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getQuestionModel
        : questionModelModelProp;
      setQuestionModelRecord(record);
    };
    queryData();
  }, [idProp, questionModelModelProp]);
  React.useEffect(resetStateValues, [questionModelRecord]);
  const validations = {
    text: [],
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    reversed: [],
    number: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          text: text ?? null,
          a: a ?? null,
          b: b ?? null,
          c: c ?? null,
          d: d ?? null,
          e: e ?? null,
          reversed: reversed ?? null,
          number: number ?? null,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateQuestionModel.replaceAll("__typename", ""),
            variables: {
              input: {
                id: questionModelRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "QuestionModelUpdateForm")}
      {...rest}
    >
      <TextField
        label="Text"
        isRequired={false}
        isReadOnly={false}
        value={text}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              text: value,
              a,
              b,
              c,
              d,
              e,
              reversed,
              number,
            };
            const result = onChange(modelFields);
            value = result?.text ?? value;
          }
          if (errors.text?.hasError) {
            runValidationTasks("text", value);
          }
          setText(value);
        }}
        onBlur={() => runValidationTasks("text", text)}
        errorMessage={errors.text?.errorMessage}
        hasError={errors.text?.hasError}
        {...getOverrideProps(overrides, "text")}
      ></TextField>
      <TextField
        label="A"
        isRequired={false}
        isReadOnly={false}
        value={a}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              text,
              a: value,
              b,
              c,
              d,
              e,
              reversed,
              number,
            };
            const result = onChange(modelFields);
            value = result?.a ?? value;
          }
          if (errors.a?.hasError) {
            runValidationTasks("a", value);
          }
          setA(value);
        }}
        onBlur={() => runValidationTasks("a", a)}
        errorMessage={errors.a?.errorMessage}
        hasError={errors.a?.hasError}
        {...getOverrideProps(overrides, "a")}
      ></TextField>
      <TextField
        label="B"
        isRequired={false}
        isReadOnly={false}
        value={b}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              text,
              a,
              b: value,
              c,
              d,
              e,
              reversed,
              number,
            };
            const result = onChange(modelFields);
            value = result?.b ?? value;
          }
          if (errors.b?.hasError) {
            runValidationTasks("b", value);
          }
          setB(value);
        }}
        onBlur={() => runValidationTasks("b", b)}
        errorMessage={errors.b?.errorMessage}
        hasError={errors.b?.hasError}
        {...getOverrideProps(overrides, "b")}
      ></TextField>
      <TextField
        label="C"
        isRequired={false}
        isReadOnly={false}
        value={c}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              text,
              a,
              b,
              c: value,
              d,
              e,
              reversed,
              number,
            };
            const result = onChange(modelFields);
            value = result?.c ?? value;
          }
          if (errors.c?.hasError) {
            runValidationTasks("c", value);
          }
          setC(value);
        }}
        onBlur={() => runValidationTasks("c", c)}
        errorMessage={errors.c?.errorMessage}
        hasError={errors.c?.hasError}
        {...getOverrideProps(overrides, "c")}
      ></TextField>
      <TextField
        label="D"
        isRequired={false}
        isReadOnly={false}
        value={d}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              text,
              a,
              b,
              c,
              d: value,
              e,
              reversed,
              number,
            };
            const result = onChange(modelFields);
            value = result?.d ?? value;
          }
          if (errors.d?.hasError) {
            runValidationTasks("d", value);
          }
          setD(value);
        }}
        onBlur={() => runValidationTasks("d", d)}
        errorMessage={errors.d?.errorMessage}
        hasError={errors.d?.hasError}
        {...getOverrideProps(overrides, "d")}
      ></TextField>
      <TextField
        label="E"
        isRequired={false}
        isReadOnly={false}
        value={e}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              text,
              a,
              b,
              c,
              d,
              e: value,
              reversed,
              number,
            };
            const result = onChange(modelFields);
            value = result?.e ?? value;
          }
          if (errors.e?.hasError) {
            runValidationTasks("e", value);
          }
          setE(value);
        }}
        onBlur={() => runValidationTasks("e", e)}
        errorMessage={errors.e?.errorMessage}
        hasError={errors.e?.hasError}
        {...getOverrideProps(overrides, "e")}
      ></TextField>
      <SwitchField
        label="Reversed"
        defaultChecked={false}
        isDisabled={false}
        isChecked={reversed}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              text,
              a,
              b,
              c,
              d,
              e,
              reversed: value,
              number,
            };
            const result = onChange(modelFields);
            value = result?.reversed ?? value;
          }
          if (errors.reversed?.hasError) {
            runValidationTasks("reversed", value);
          }
          setReversed(value);
        }}
        onBlur={() => runValidationTasks("reversed", reversed)}
        errorMessage={errors.reversed?.errorMessage}
        hasError={errors.reversed?.hasError}
        {...getOverrideProps(overrides, "reversed")}
      ></SwitchField>
      <TextField
        label="Number"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={number}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              text,
              a,
              b,
              c,
              d,
              e,
              reversed,
              number: value,
            };
            const result = onChange(modelFields);
            value = result?.number ?? value;
          }
          if (errors.number?.hasError) {
            runValidationTasks("number", value);
          }
          setNumber(value);
        }}
        onBlur={() => runValidationTasks("number", number)}
        errorMessage={errors.number?.errorMessage}
        hasError={errors.number?.hasError}
        {...getOverrideProps(overrides, "number")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || questionModelModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || questionModelModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
