import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/atoms/dialog";
import { FormField, FormItem, FormControl, FormMessage, Form } from "@/components/atoms/form";
import { Input } from "@/components/atoms/input";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/button";
import { useDropzone } from "react-dropzone";
import { DialogClose } from "@radix-ui/react-dialog";
import { useMutation } from "@tanstack/react-query";
import { songApi } from "@/lib/api/song-api";
import { zodResolver } from "@hookform/resolvers/zod";
import { newSongBodySchema, NewSongType } from "mp-validation";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";

function UploadSong() {
  const [audio, setAudio] = useState<File | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const songForm = useForm({
    resolver: zodResolver(newSongBodySchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: songMutate, isPending } = useMutation({
    mutationFn: (songInfo: FormData) => songApi.createSong(songInfo),
    onSuccess: () => {
      window.location.reload();
    },
  });

  const onSubmit = (songInfo: NewSongType) => {
    const formdata = new FormData();

    formdata.append("name", songInfo.name);
    if (audio && image) formdata.append("audio", audio), formdata.append("image", image);

    songMutate(formdata);
  };

  const {
    getRootProps: audioRootProps,
    getInputProps: audioInputProps,
    isDragActive: isAudioActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => setAudio(acceptedFiles[0]),
    accept: { "audio/*": [".mp3"] },
    maxFiles: 1,
    maxSize: 1e7,
  });

  const {
    getRootProps: imageRootProps,
    getInputProps: imageInputProps,
    isDragActive: isImageActive,
  } = useDropzone({
    onDrop: (acceptedFiles) => setImage(acceptedFiles[0]),
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
    maxFiles: 1,
    maxSize: 1e7,
  });

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-main">Upload new song.</DialogTitle>
        <DialogDescription>Upload new song and let others enjoy your music.</DialogDescription>
        <Form {...songForm}>
          <form onSubmit={songForm.handleSubmit(onSubmit)}>
            <div className="space-y-4 w-full">
              <div
                {...audioRootProps()}
                className="h-[200px] border border-input border-dashed rounded-lg flex items-center justify-center cursor"
              >
                <Input name="audio" {...audioInputProps({ multiple: false })} />
                <p className="px-8 truncate w-[461.52px] text-center">
                  {isAudioActive && "Drop it here ..."}
                  {!isAudioActive && !audio && "Drag your song audio file ..."}
                  {audio ? audio.name : ""}
                </p>
              </div>
              <div
                {...imageRootProps()}
                className="h-[200px] border border-input border-dashed rounded-lg flex items-center justify-center cursor-pointer"
              >
                <Input name="image" {...imageInputProps({ multiple: false, type: "image" })} />
                <p className="px-8 truncate w-[461.52px] text-center">
                  {isImageActive && "Drop it here ..."}
                  {!isImageActive && !image && "Drag your song image file ..."}
                  {image ? image.name : ""}
                </p>
              </div>
              <FormField
                control={songForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Song name - eg: Stakatak sbakatak" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className="grid grid-cols-2 gap-4">
                <DialogClose asChild>
                  <Button variant={"outline"} type="button" disabled={isPending}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button variant={"main"} type="submit" className="space-x-1" disabled={isPending}>
                  {isPending && <LoaderCircle className="animate-spin" size={20} />} <span>Create</span>
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogHeader>
    </DialogContent>
  );
}

export default UploadSong;
