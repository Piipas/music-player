import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/atoms/dialog";
import { FormField, FormItem, FormControl, FormMessage, Form } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useForm } from "react-hook-form";
import { Button } from "@/components/atoms/button";
import { useDropzone } from "react-dropzone";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { newSongBodySchema, NewSongType } from "mp-validation";
import { useState } from "react";
import { artistApi } from "@/lib/api/artist-api";
import { useNavigate } from "react-router-dom";

function SwitchArtist() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);

  const songForm = useForm({
    resolver: zodResolver(newSongBodySchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: songMutate } = useMutation({
    mutationFn: (artistInfo: FormData) => artistApi.switchArtist(artistInfo),
    onSuccess: (data) => {
      navigate(`/artist/${data.id}`);
    },
  });

  const onSubmit = (artistInfo: NewSongType) => {
    const formdata = new FormData();

    formdata.append("name", artistInfo.name);
    if (avatar && cover) formdata.append("avatar", avatar), formdata.append("cover", cover);

    songMutate(formdata);
  };

  const {
    getRootProps: avatarRootProps,
    getInputProps: avatarInputProps,
    isDragActive: isAvatarActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => setAvatar(acceptedFiles[0]),
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    maxSize: 1e7,
  });

  const {
    getRootProps: coverRootProps,
    getInputProps: coverInputProps,
    isDragActive: isCoverActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => setCover(acceptedFiles[0]),
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    maxSize: 1e7,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-main">Be an artist.</DialogTitle>
        <DialogDescription>Be an artist and upload illimited songs.</DialogDescription>
        <Form {...songForm}>
          <form onSubmit={songForm.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div
                {...avatarRootProps()}
                className="h-[200px] border border-input border-dashed rounded-lg flex items-center justify-center cursor-pointer"
              >
                <Input name="avatar" {...avatarInputProps({ multiple: false })} />
                <p className="px-8 truncate w-[461.52px] text-center">
                  {isAvatarActive && "Drop it here ..."}
                  {!isAvatarActive && !avatar && "Drag your avatar file ..."}
                  {avatar ? avatar.name : ""}
                </p>
              </div>
              <div
                {...coverRootProps()}
                className="h-[200px] border border-input border-dashed rounded-lg flex items-center justify-center cursor-pointer"
              >
                <Input name="cover" {...coverInputProps({ multiple: false, type: "cover" })} />
                <p className="px-8 truncate w-[461.52px] text-center">
                  {isCoverActive && "Drop it here ..."}
                  {!isCoverActive && !cover && "Drag your cover file ..."}
                  {cover ? cover.name : ""}
                </p>
              </div>
              <FormField
                control={songForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Artist name - eg: Cheb laarbi" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className="grid grid-cols-2 gap-4">
                <DialogClose asChild>
                  <Button variant={"outline"} type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant={"main"} type="submit">
                  Create
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
}

export default SwitchArtist;
