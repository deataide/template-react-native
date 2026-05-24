import { FlatList, RefreshControl, Text, View } from "react-native";
import { usePosts } from "../hooks/usePost";
import type { Post } from "../types/post.types";

export function PostListScreen() {
  const { data, isLoading, isError, refetch, isFetching } = usePosts();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-4">
        <Text className="text-text-primary text-base">Carregando...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-4">
        <Text className="text-error text-base">Erro ao carregar.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Post }) => (
    <View className="rounded-3xl bg-surface p-5 mb-4 border border-border shadow-sm shadow-black/10">
      <Text className="text-base font-semibold text-text-primary mb-2">
        {item.title}
      </Text>
      <Text className="text-xs uppercase tracking-[0.2px] text-text-secondary">
        Criado em {new Date(item.createdAt).toLocaleDateString("pt-BR")}
      </Text>
    </View>
  );

  const ListHeader = (
    <View className="border-b border-border px-4 py-4">
      <Text className="text-h2 font-bold text-text-primary">Posts</Text>
      <Text className="mt-1 text-sm text-text-secondary">
        {data?.length ?? 0} post{data?.length === 1 ? "" : "s"} encontrados
        {isFetching ? " • Atualizando..." : ""}
      </Text>
    </View>
  );

  const Empty = (
    <View className="rounded-3xl border border-border bg-surface p-6 mx-4 mt-4 items-center justify-center">
      <Text className="text-text-secondary">Nenhum post encontrado</Text>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={Empty}
        contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }
      />
    </View>
  );
}
