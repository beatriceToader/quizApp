/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type QuestionModelCreateFormInputValues = {
    text?: string;
    a?: string;
    b?: string;
    c?: string;
    d?: string;
    e?: string;
    reversed?: boolean;
    number?: number;
};
export declare type QuestionModelCreateFormValidationValues = {
    text?: ValidationFunction<string>;
    a?: ValidationFunction<string>;
    b?: ValidationFunction<string>;
    c?: ValidationFunction<string>;
    d?: ValidationFunction<string>;
    e?: ValidationFunction<string>;
    reversed?: ValidationFunction<boolean>;
    number?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type QuestionModelCreateFormOverridesProps = {
    QuestionModelCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    text?: PrimitiveOverrideProps<TextFieldProps>;
    a?: PrimitiveOverrideProps<TextFieldProps>;
    b?: PrimitiveOverrideProps<TextFieldProps>;
    c?: PrimitiveOverrideProps<TextFieldProps>;
    d?: PrimitiveOverrideProps<TextFieldProps>;
    e?: PrimitiveOverrideProps<TextFieldProps>;
    reversed?: PrimitiveOverrideProps<SwitchFieldProps>;
    number?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type QuestionModelCreateFormProps = React.PropsWithChildren<{
    overrides?: QuestionModelCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: QuestionModelCreateFormInputValues) => QuestionModelCreateFormInputValues;
    onSuccess?: (fields: QuestionModelCreateFormInputValues) => void;
    onError?: (fields: QuestionModelCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: QuestionModelCreateFormInputValues) => QuestionModelCreateFormInputValues;
    onValidate?: QuestionModelCreateFormValidationValues;
} & React.CSSProperties>;
export default function QuestionModelCreateForm(props: QuestionModelCreateFormProps): React.ReactElement;
