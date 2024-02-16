"use client";

import TextStyles from "@/utils/textstyles";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { joinSchema } from "@/zod/join-schema";
import { z } from "zod";

interface JoinFormProps {
  submit: (data: FormData, afterSubmitUrl: string) => void;
  afterSubmitUrl: string;
}

type FormData = z.infer<typeof joinSchema>;

export default function UserJoinForm(props: JoinFormProps) {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(joinSchema)
  });

  const onSubmit = async (data: FormData) => {
    props.submit(data, props.afterSubmitUrl);
  }

  return (
    <div className="flex flex-col gap-2 w-full h-full">
      <div>
        <div className={TextStyles.H4}>Biography</div>
      </div>
      <form
        className="mt-12"
        action=""
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
        <textarea
          {...register("biography", { required: true })}
          className="w-full h-40 rounded-md bg-primary p-2"
          placeholder="Tell us about yourself"
        />
          {errors?.biography && (
            <p className="text-red-600 text-sm">
              {errors?.biography?.message}
            </p>
          )}
        </div>
        <div className={"flex w-full justify-end"}>
          <button className="bg-primary text-white rounded-md p-2" role={"submit"}
                  disabled={!isDirty || !isValid || isSubmitting}>Save
          </button>
        </div>
      </form>
    </div>
  );
};